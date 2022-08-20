import toast, {ToastOptions} from 'react-hot-toast';

export class Toaster {
    private static defaultOptions: ToastOptions = {
        position: 'bottom-center',
        duration: 3500,
        style: {
            padding: '10px 40px',
        },
    };

    public static toast(message: string, opts: ToastOptions = {}): string {
        return toast(
            message,
            {
                ...opts,
                ...this.defaultOptions,
            }
        );
    }

    public static success(message: string, opts: ToastOptions = {}): string {
        return toast.success(
            message,
            {
                ...opts,
                ...this.defaultOptions,
            }
        );
    }

    public static error(message: string, opts: ToastOptions = {}): string {
        return toast.error(
            message,
            {
                ...opts,
                ...this.defaultOptions,
            }
        );
    }
}
