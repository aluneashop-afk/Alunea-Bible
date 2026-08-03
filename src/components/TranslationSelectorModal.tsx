import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Languages } from 'lucide-react';
import { useBible } from '../contexts/BibleContext';

interface TranslationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (translationId: string) => void;
}

export const TranslationSelectorModal: React.FC<TranslationSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { translations, currentTranslation } = useBible();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] p-6 shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <Languages size={20} className="text-[#CD0000]" />
              Pilih Versi Terjemahan
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-medium mb-5">
            Pilih versi terjemahan Alkitab yang ingin Anda baca.
          </p>

          <div className="space-y-3">
            {translations.map((tr) => {
              const isSelected = tr.id.toLowerCase() === currentTranslation.toLowerCase();
              return (
                <button
                  key={tr.id}
                  onClick={() => {
                    onSelect(tr.id);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[var(--bg-card-secondary)] border-[#CD0000] text-[#CD0000] font-extrabold'
                      : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] hover:border-[#CD0000] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{tr.name}</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)]">
                        {tr.shortName}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">
                      {tr.language}
                    </span>
                  </div>

                  {isSelected && <Check size={18} className="text-[#CD0000]" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
