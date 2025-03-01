import { ConfigProvider } from "antd";

function ThemeProvider({ children }) {
    return (
        <ConfigProvider theme={
            {
                token: {
                    colorPrimary: "273DB4",
                    borderRadius: 2
                },
                components: {
                    Button: {
                        controlOutline: 'none',
                        controlHeight: 45
                    },
                    Input: {
                        controlOutline: 'none',
                        controlHeight: 45
                    }
                }
            }
        }>
            {
                children
            }
        </ConfigProvider>
    )
}

export default ThemeProvider;