let workspace: any = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    workspace = {
        hello: "hello",
        user: {},
        symptoms: [],
        preferences: {},
    }
}

export const setWorkspace = (new_workspace: any) => {
    workspace = new_workspace;
}