import React from "react";
import { Card, CardActions, CardContent, Button, Typography} from "@mui/material";
import { Product } from "../CustomTypes";


export default function ProductCard(product : Product) {
return(
    <Card sx={{}}>
        <CardContent>
            <Typography variant="h5">${product.name}</Typography>
        </CardContent>
    </Card>
)
}
