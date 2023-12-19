import { Button, Card, Collapse, CardActions, CardContent, Typography, Box } from "@mui/material";
import { CreateButton, DeleteButton, EditButton, ExportButton, ShowButton, useTranslate } from "react-admin";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { PropsWithChildren, useState } from "react";
import { styled } from '@mui/material/styles';

export const ExpandableCardTemplate = () => {

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

  const handleExpandClick = () => {
    setCardExpanded(!cardExpanded);
  };

  const ExpandMore = styled((props: IconButtonProps & {expand: boolean}) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [cardExpanded, setCardExpanded] = useState(false);

  return (
    <Card sx={{ minWidth: 275, /*vtl #if ($card.solid) color: 'common.white', backgroundColor: 'primary.main' #end */ }} /*vtl #if ($card.outlined) variant="outlined" #end */>
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

      </CardContent>
      <CardActions disableSpacing>
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
        <ExpandMore
          expand={cardExpanded}
          onClick={handleExpandClick}
          aria-expanded={cardExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={cardExpanded} timeout="auto" unmountOnExit>
        <CardContent>
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
      </Collapse>
    </Card>
  )
}