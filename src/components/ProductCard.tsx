import React from "react";
import { Card, CardActions, CardContent, Button, Typography} from "@mui/material";
import { Product } from "../CustomTypes";


export default function ProductCard( product: Product ) {
    return (
      <Card className="mb-3">
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography color="textSecondary">
            Item Number: {product.itemNumber}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Price: ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    );
  };