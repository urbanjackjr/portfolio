declare global {
    interface Window { grecaptcha: any; }
}

export const useReCaptcha = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (window.grecaptcha) {
            window.grecaptcha.ready(function () {
                window.grecaptcha.execute(useRuntimeConfig().public.reCaptchaSiteKey, { action: 'submit' }).then(function (token: string) {
                    resolve(token);
                });
            });
        }
        else {
            reject("reCaptcha have not loaded yet. Try in a few seconds.")
        }
    })
}