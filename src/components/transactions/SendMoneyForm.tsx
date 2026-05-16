'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { transactionSchema, type TransactionFormData } from '@/lib/validations';
import { useCreateTransaction, useAccounts } from '@/hooks/useAccounts';
import { Button, Input, Select, Alert, Modal } from '@/components/ui';
import { Account } from '@/types';

interface SendMoneyFormProps {
  account: Account;
  onSuccess?: () => void;
}

export function SendMoneyForm({ account, onSuccess }: SendMoneyFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { accounts } = useAccounts();
  const { create, isLoading, error } = useCreateTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const recipientAccounts = accounts.filter((a) => a._id !== account._id && a.status === 'ACTIVE');

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const idempotencyKey = uuidv4();
      await create({
        fromAccount: account._id,
        toAccount: data.toAccountId,
        amount: data.amount,
        idempotencyKey,
      });

      setSuccessMessage(`Successfully sent ${data.amount} BDT`);
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
      >
        Send Money
      </Button>

      <Modal
        isOpen={showModal}
        title="Send Money"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert type="error" message={error} />
          )}

          <Select
            label="Recipient Account"
            {...register('toAccountId')}
            error={errors.toAccountId?.message}
          >
            <option value="">Select an account</option>
            {recipientAccounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc._id.slice(0, 8)}... ({acc.status})
              </option>
            ))}
          </Select>

          <Input
            label="Amount (BDT)"
            type="number"
            step="0.01"
            placeholder="1000"
            {...register('amount', { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Send Money
            </Button>
          </div>
        </form>
      </Modal>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </>
  );
}
