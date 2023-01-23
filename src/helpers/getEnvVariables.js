export const getEnvVariables = () => {
    //acceder a las variables de entorno

    import.meta.env;

    return {
        ...import.meta.env
    }

}