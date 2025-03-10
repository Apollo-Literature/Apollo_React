import { Box, Typography } from "@mui/material";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
    return (
        <Box
            sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease",
                    boxShadow: 3,
                },
            }}
        >
            {icon}
            <Typography variant="h6" sx={{ mt: 1 }}>{label}</Typography>
            <Typography variant="body1">{value.toLocaleString()}</Typography>
        </Box>
    );
}
