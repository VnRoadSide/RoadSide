import { useState } from 'react';

type ModalHookReturnType = () => {
    modalVisible: boolean
    show: () => void
}
const useModal: ModalHookReturnType = () =>
{
    const [modalVisible, setmodalVisible] = useState<boolean>(false);
    
    function show()
    {
        setmodalVisible(!modalVisible);
    }
    
    return {
        modalVisible,
        show,
    };
};

export default useModal;