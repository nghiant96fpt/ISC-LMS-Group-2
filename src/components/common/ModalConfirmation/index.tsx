import React from 'react';
import { ModalProps } from './type';
import TitleComponent from '../../Title';
import './style.css';

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = '',
    position = 'center',
    footerContent,
    titleAlign = 'left',
    showCloseButton = true,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className={`modalWrapper size-${size} position-${position}`} onClick={(e) => e.stopPropagation()}>
                <div className="modalContent">
                    {/* HEADER */}
                    <div className="modalHeader">
                        <TitleComponent text={title || ''} size={28} weight="extrabold" align={titleAlign} className="flex-1" />
                        {showCloseButton && (
                            <button className="block cursor-pointer" onClick={onClose}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427" stroke="black" strokeWidth="1.6" strokeLinecap="round"></path>
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* BODY */}
                    <div className='modalBody'>{children}</div>

                    {/* FOOTER */}
                    {footerContent && <div className="modalFooter">{footerContent}</div>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
