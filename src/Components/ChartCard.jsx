import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function ChartCard(props){
    return(
      <Card elevation={3}>
        <CardHeader
          title={props.title}
          subheader={props.info}
        ></CardHeader>
        <CardContent>
          <Typography>
            Hola Mundo!
          </Typography>
        </CardContent>
      </Card>
    );
}