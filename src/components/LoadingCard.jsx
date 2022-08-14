import { Card, CardContent, CircularProgress } from "@mui/material";

const LoadingCardContent = () => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EDECEC",
    }}
  >
    <CardContent>
      <CircularProgress />
    </CardContent>
  </Card>
);

export default LoadingCardContent;
