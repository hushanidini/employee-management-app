import Grid from '@mui/material/Grid';
import Employees from '@/componets/employees/molecules/Employees';
export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Employees />
      </Grid>
    </Grid>
  )
}
