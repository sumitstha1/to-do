import { toast, Bounce } from 'react-toastify';

const notify = (message, status) => {

    let config = {
        transition: Bounce,
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"light"
    }

    switch (status) {
        case "error":
            toast.error(message, config)
            break;
        case "warn":
            toast.warn(message, config)
            break;
        default:
            toast.success(message, config)
            break;
    }
};

export default notify