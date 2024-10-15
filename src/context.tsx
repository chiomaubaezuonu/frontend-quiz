import { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react'

export type DarkTheme = boolean

interface ContextProps{
    darkTheme : DarkTheme,
    setDarkTheme: (newTheme:DarkTheme) => void 
}

const GlobalContext = createContext<ContextProps>({
darkTheme: false,
setDarkTheme : () => { }
})

export const GlobalContextProvider: FunctionComponent<{children : ReactNode}> = ({ children }) => {

const [darkTheme, setDarkTheme] = useState(false)

    const contextValue = {
        darkTheme,
        setDarkTheme,
    }

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);