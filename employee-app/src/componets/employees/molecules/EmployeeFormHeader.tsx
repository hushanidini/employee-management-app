"use client";
import React  from "react";
import Link from "next/link";
import {Grid, Button} from '@mui/material';

const  EmployeeFormHeader = () =>{
  return (
        <Grid container spacing={2} style={{marginTop: '10px'}}>
            <Grid item xs={6} md={8} />
            <Grid item xs={6} md={4}>
                <Link href={`/`}>
                    <Button variant="outlined" size="medium" >
                        LSIT VIEW
                    </Button> 
                </Link>
            </Grid>
        </Grid>
  )
}

export default EmployeeFormHeader