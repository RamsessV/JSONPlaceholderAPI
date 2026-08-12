export const loginAction = (username: string, password: string) => {
    if(username !== 'admin' || password !== '123456') return false;

    document.cookie = 'token=admin; path=/';
    return true;
}