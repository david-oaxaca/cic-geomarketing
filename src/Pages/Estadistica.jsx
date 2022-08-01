import React, { useEffect, useState } from 'react';
import ChartCard from '../Components/ChartCard';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


export default function Estadistica() {
  const [charts, setCharts] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:8000/charts')
    .then(res => res.json())
    .then(data => setCharts(data))
  }, [])
  return (
    <Container sx={{ m: "2rem" }}>
      <Grid container spacing={2}>
        {charts.map(chart => (
          <Grid item xs={12} sm={6} md={4}>
            <ChartCard title={chart.title} info={chart.info} state={chart.state} type={chart.type}></ChartCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
