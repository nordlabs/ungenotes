export class LoadingScreen {
    public static minLoadingScreenTime = 3.5;
    public static loadingScreenDelayVariance = 2;

    private static zIndexDelay = 1;

    public static show(): void {
        const loadingScreen = document.getElementById('loading-screen');

        if (loadingScreen) {
            loadingScreen.style.zIndex = '50';
            loadingScreen.style.opacity = '1';
        }
    }

    public static hide(): void {
        const loadingScreen = document.getElementById('loading-screen');

        if (loadingScreen) {
            loadingScreen.style.opacity = '0';

            setTimeout(
                () => {
                    loadingScreen.style.zIndex = '-1';
                },
                this.zIndexDelay * 1000,
            );
        }
    }
}
