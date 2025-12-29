import React, { useEffect } from "react";
import styles from "./ModalMcq.module.css";

/**
 * Premium MCQ Modal component.
 *
 * Props:
 *  - isOpen: boolean – controls visibility.
 *  - onClose: () => void – called when the modal is dismissed.
 *  - question: string – the MCQ question.
 *  - options: string[] – list of answer options.
 *  - onSelect: (index: number) => void – callback when an option is chosen.
 */
export default function ModalMcq({
    isOpen,
    onClose,
    question,
    options = [],
    onSelect,
}) {
    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOptionClick = (idx) => {
        if (onSelect) onSelect(idx);
        onClose();
    };

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <h2 className={styles.question}>{question}</h2>
                <ul className={styles.optionsList}>
                    {options.map((opt, idx) => (
                        <li key={idx} className={styles.optionItem} onClick={() => handleOptionClick(idx)}>
                            {opt}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
