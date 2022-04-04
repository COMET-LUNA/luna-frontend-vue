let workspace: any = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    workspace = {
        hello: "hello",
        user: {},
    }
}

export const setUser = (user: any) => {
    workspace.user = user
}
