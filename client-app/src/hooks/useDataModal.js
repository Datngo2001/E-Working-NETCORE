import { useState } from 'react'

function useModal() {
    const [dataModal, setDataModal] = useState({
        open: false,
        data: undefined,
        handleSave: () => { }
    });

    const openCreateModal = (onSave) => {
        setDataModal({
            open: true,
            data: undefined,
            handleSave: onSave ? (data) => { onSave(data); closeModal(); } : () => { }
        });
    }

    const openDetailModal = (data) => {
        setDataModal({
            open: true,
            data: data,
        });
    };

    const openUpdateModal = (init, onSave) => {
        setDataModal({
            open: true,
            data: init,
            handleSave: onSave ? (data) => { onSave(data); closeModal(); } : () => { }
        });
    };

    const closeModal = () => {
        setDataModal({
            open: false,
            category: null,
        });
    }

    return { dataModal, openCreateModal, openDetailModal, openUpdateModal, closeModal }
}

export default useModal