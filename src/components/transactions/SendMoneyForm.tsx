"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { transactionSchema, type TransactionFormData } from "@/lib/validations";
import { useCreateTransaction, useAccounts } from "@/hooks/useAccounts";
import { Button, Input, Select, Alert, Modal } from "@/components/ui";
import { Account } from "@/types";
import { Send, ArrowRight } from "lucide-react";

interface SendMoneyFormProps {
  account: Account;
  onSuccess?: () => void;
}

export function SendMoneyForm({ account, onSuccess }: SendMoneyFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { accounts } = useAccounts();
  const { create, isLoading, error } = useCreateTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const amount = watch("amount");
  const toAccountId = watch("toAccountId");

  const recipientAccounts = accounts.filter(
    (a) => a._id !== account._id && a.status === "ACTIVE",
  );

  const selectedAccount = accounts.find((a) => a._id === toAccountId);

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const idempotencyKey = uuidv4();
      await create({
        fromAccount: account._id,
        toAccount: data.toAccountId,
        amount: data.amount,
        idempotencyKey,
      });

      setSuccessMessage(`Successfully sent ${data.amount} ${account.currency}`);
      reset();
      setShowModal(false);
      onSuccess?.();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        icon={<Send className="w-4 h-4" />}
        fullWidth
      >
        Send Money
      </Button>

      <Modal
        isOpen={showModal}
        title="Send Money Transfer"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <Alert type="error" message={error} />}

          {/* From Account Info */}
          <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">
              From Account
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              {account._id.slice(0, 12)}...
            </p>
          </div>

          {/* To Account Select */}
          <Select
            label="Recipient Account"
            {...register("toAccountId")}
            error={errors.toAccountId?.message}
          >
            <option value="">Select an account</option>
            {recipientAccounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc._id.slice(0, 12)}... ({acc.currency})
              </option>
            ))}
          </Select>

          {/* Amount Input */}
          <Input
            label={`Amount (${account.currency})`}
            type="number"
            step="0.01"
            placeholder="1000"
            {...register("amount", { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          {/* Transfer Preview */}
          {amount && toAccountId && selectedAccount && (
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Amount
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    {amount} {account.currency}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400" />
                <div className="text-right">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    To
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {selectedAccount._id.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
              icon={<Send className="w-4 h-4" />}
            >
              Send Money
            </Button>
          </div>
        </form>
      </Modal>

      {successMessage && (
        <Alert
          type="success"
          title="Transfer Complete"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
    </>
  );
}
