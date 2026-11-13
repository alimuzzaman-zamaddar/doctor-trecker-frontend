'use client';

import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Delete',
  isLoading = false,
  children,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"
          aria-hidden="true"
        />
        <div className="text-sm text-rose-800">
          {description || 'This action cannot be undone.'}
          {children}
        </div>
      </div>
    </Modal>
  );
}
