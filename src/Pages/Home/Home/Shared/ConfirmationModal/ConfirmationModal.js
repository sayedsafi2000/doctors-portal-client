import React from 'react';

const ConfirmationModal = ({title,message,closeModal,deletingDoctor,handleDelete}) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={()=>handleDelete(deletingDoctor._id)} htmlFor="confirmation-modal" className="btn btn-error">Confirm</label>
                        <button className='btn btn-outline' onClick={closeModal} >Cancle</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;