let workspace: any = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    workspace = {
        hello: "hello",
        user: {},
        history: {},
        symptoms: [],
        preferences: {},
        registration: {
            personal: {
                firstName: "",
                lastName: "",
                birthMonth: "",
                birthDay: "",
                birthYear: "",
                emailAddress: "",
                sex: "",
              },
            security: {
                password: "",
                confPassword: "",
            },
            medical: {
                bloodType: "",
                heightCm: "",
                weightKg: "",
                diet: "",
                illnesses: "",
            }
        }
    }
}

export const setWorkspace = (new_workspace: any) => {
    workspace = new_workspace;
}