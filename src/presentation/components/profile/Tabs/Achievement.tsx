import React, { useState } from "react";
import TabPanel from "./TabPanel";
import { Row, Value } from "../../utils/types";
import AchievementBox from "./utils/AchievementBox";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import AlertDialog from "./utils/AchievementAdd";
import AddCard from "../../shared/AddCard";

const AchievementTab: React.FC<Value> = ({
    value
}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'lg'));

    const handleClick = (value: number) => {
        alert(value)
    }


    const rows: Row[] = [
        { id: 1, title: 'Achievement 1', description: 'Won national science fair.', year_awarded: '2025' },
        { id: 2, title: 'Achievement 2', description: 'Published a research paper in AI.', year_awarded: '2024' },
        { id: 3, title: 'Achievement 3', description: 'Completed a marathon.', year_awarded: '2023' },
        { id: 4, title: 'Achievement 4', description: 'Organized a tech conference.', year_awarded: '2025' },
        { id: 5, title: 'Achievement 5', description: 'Volunteered 200+ hours.', year_awarded: '2022' },
        { id: 6, title: 'Achievement 6', description: 'Won coding competition.', year_awarded: '2025' },
        { id: 7, title: 'Achievement 7', description: 'Best employee of the year.', year_awarded: '2021' },
        { id: 8, title: 'Achievement 8', description: 'Built a community app.', year_awarded: '2023' },
        { id: 9, title: 'Achievement 9', description: 'Top scorer in mathematics.', year_awarded: '2024' },
        { id: 10, title: 'Achievement 10', description: 'Started a non-profit organization.', year_awarded: '2023' },
        { id: 11, title: 'Achievement 11', description: 'Spoke at TEDx event.', year_awarded: '2022' },
        { id: 12, title: 'Achievement 12', description: 'Won school chess tournament.', year_awarded: '2021' },
        { id: 13, title: 'Achievement 13', description: 'Created a viral YouTube channel.', year_awarded: '2024' },
        { id: 14, title: 'Achievement 14', description: 'Graduated with honors.', year_awarded: '2025' },
        { id: 15, title: 'Achievement 15', description: 'Built a game in Unity.', year_awarded: '2023' },
        { id: 16, title: 'Achievement 16', description: 'Led a successful hackathon team.', year_awarded: '2022' }
    ];

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <TabPanel value={3} index={value}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                }}
            >
                <Grid
                    container
                    sx={{
                        display: isMobile ? 'block' : 'flex',
                    }}
                    spacing={2}
                >
                    <Grid size={{ sm: 12, md: 6 }} >
                        <AddCard onClick={handleOpen} />
                    </Grid>
                    {rows.map((row, index) => (
                        <Grid size={{ sm: 12, md: 6 }} key={index}>
                            <AchievementBox
                                id={row.id as number}
                                title={row.title as string}
                                description={row.description as string}
                                year_awarded={row.year_awarded as string}
                                onClick={handleClick}
                            />
                        </Grid>
                    ))}
                </Grid>
                <AlertDialog
                    open={open}
                    handleClose={handleClose}
                />

            </Box>
        </TabPanel>
    )
}

export default AchievementTab