import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { CreateButton, DeleteButton, EditButton, ExportButton, ShowButton, useTranslate } from "react-admin";
import { useState } from "react";
import ImageStub from "./media/ImageStub.png";

export const ImageCardTemplate = () => {

  /*vtl
  #if (!$card.itemsVariableName)
  const [cardData, setCardData] = useState<${card.itemType}>();
  #set($dataVariable = "cardData")
  #else
  #set($dataVariable = $card.itemsVariableName)
  #end
  */
  /*vtl #if (false)*/ useState(); /*vtl #end */
  /*vtl #if ($card.translateLabels)*/
  const translate = useTranslate();
    /*vtl #if ($card.graphQLItemType)
    #set($translationKeyPrefix = "resources.${card.graphQLItemType}.fields")
    #else
    #set($translationKeyPrefix = "resources.${card.itemType}")
    #end
    */
  /*vtl #end */

  return (
    <Card sx={{ maxWidth: 450, /*vtl #if ($card.solid) color: 'common.white', backgroundColor: 'primary.main' #end */ }} /*vtl #if ($card.outlined) variant="outlined" #end */>
      <CardMedia sx={{ height: '12rem' }} image={ImageStub} />
      <CardContent>
        {/*vtl #if($card.titleProperty) */}
        <Typography variant="h4" component="div">
          {/*vtl {$dataVariable?.${card.titleProperty.name}} */}
        </Typography>
        {/*vtl #end */}
        {/*vtl #if($card.subTitleProperty) */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/*vtl {$dataVariable?.${card.subTitleProperty.name}} */}
        </Typography>
        {/*vtl #end */}

        {/*vtl #foreach($property in $card.itemProperties) */}
          {/*vtl #if (!$property.asTitle && !$property.asSubTitle) */}
            {/*vtl #if ($card.labelPosition == 'hidden') */}
              <Typography mr={1} component="span">{/*vtl #if ($property.dataType == 'object') {JSON.stringify($dataVariable?.${property.name})} #else {$dataVariable?.${property.name}} #end */}</Typography>
            {/*vtl #elseif ($card.labelPosition == 'top') */}
              <Typography variant="caption">{/*vtl #if ($card.translateLabels) {translate('${translationKeyPrefix}.${property.name}')} #else ${property.label} #end */}</Typography>
              <Typography mb={1} component="p">{/*vtl #if ($property.dataType == 'object') {JSON.stringify($dataVariable?.${property.name})} #else {$dataVariable?.${property.name}} #end */}</Typography>
            {/*vtl #elseif ($card.labelPosition == 'inline') */}
              <Typography component="p">
                {/*vtl #if ($card.translateLabels) {translate('${translationKeyPrefix}.${property.name}')}#else ${property.label}#end*/}:&nbsp;
                <Box component="span" sx={{fontWeight: "bold"}}>{/*vtl #if ($property.dataType == 'object') {JSON.stringify($dataVariable?.${property.name})} #else {$dataVariable?.${property.name}} #end */}</Box>
              </Typography>
            {/*vtl #end */}
          {/*vtl #end */}
        {/*vtl #end */}
      </CardContent>
      {/*vtl #if ($card.actions.size() > 0)*/}
      <CardActions>
        {/*vtl #foreach($action in $card.actions) */}
        {/*vtl #if($action.type == 'show') */}
        <ShowButton /*vtl label="$action.label"*/ /*vtl record={$dataVariable}*/ onClick={() => {alert('TODO: specify resource or implement custom show logic')}}/>
        {/*vtl #elseif ($action.type == 'edit') */}
        <EditButton /*vtl label="$action.label"*/ /*vtl record={$dataVariable}*/ onClick={() => {alert('TODO: specify resource or implement custom edit logic')}} />
        {/*vtl #elseif ($action.type == 'delete') */}
        <DeleteButton /*vtl label="$action.label"*/ /*vtl record={$dataVariable}*/ onClick={() => {alert('TODO: specify resource or implement custom delete logic')}} />
        {/*vtl #elseif ($action.type == 'custom') */}
        <Button onClick={() => {alert('TODO: implement custom action logic')}}>{/*vtl $action.label */}</Button>
        {/*vtl #end */}
        {/*vtl #end */}
      </CardActions>
      {/*vtl #end */}
    </Card>
  )
}