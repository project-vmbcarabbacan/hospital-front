import React from "react"
import { Box, Toolbar, useTheme } from "@mui/material"
import { useAppSelector } from "../../app/store/hooks"

const ToolBar: React.FC = () => {
    const theme = useTheme()
    const name = useAppSelector(state => state.auth.user?.name)
    const photo = useAppSelector(state => state.auth.user?.photo)
    return (

        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // or 'flex-start' if you want left alignment
                py: 2,
                px: 2,
                gap: 1.5,
                color: theme.palette.primary.main,
            }}
        >
            <Box
                component="img"
                src={photo} // 🔁 Replace with your actual logo path
                alt={name}
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%', // optional: makes it circular
                    objectFit: 'contain',
                }}
            />
            <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.text.primary }}>
                {name}
            </Box>
        </Toolbar>

    )
}

export default ToolBar