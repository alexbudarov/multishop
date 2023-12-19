import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Button, CreateButton, DeleteButton, EditButton, ExportButton, ShowButton } from "react-admin";

export const TreeTableTemplate = () => {

  const [tableData, setTableData] = useState/*vtl<Array<${table.itemType}>>*/([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(false);

  /*vtl #if($table.sortProperties.size() > 0)  */
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  /*vtl #end */
  /*vtl #if($table.filterProperties.size() > 0)  */
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  /*vtl #end */
  /*vtl #if($table.pagination)
            #if($table.rowsPerPage)
              #set($paginationState = "{
    pageIndex: 0,
    pageSize: $table.rowsPerPage,
  }")
            #else
            #set($paginationState = "{
    pageIndex: 0,
    pageSize: 15,
  }")
            #end
  */
  const [pagination, setPagination] = useState<MRT_PaginationState>(/*vtl$paginationState*/);
  const [rowCount, setRowCount] = useState(0);
  /*vtl #end */

  useEffect(() => {
    setIsTableDataLoading(true);
    const loadData = async () => {
      // TODO get data
      /*vtl
      #if ($table.itemsVariableName)
      setTableData($table.itemsVariableName);
      #if($table.pagination)
      setRowCount(${table.itemsVariableName}.length);
      #end
      #else
      // setTableData();
      // setRowCount();
      #end
      */
      setIsTableDataLoading(false);
    }
    loadData()
  }, [
    /*vtl #if($table.filterProperties.size() > 0)
    columnFilters,
    #end*/
    /*vtl #if($table.pagination)
    pagination?.pageIndex,
    pagination?.pageSize,
    #end*/
    /*vtl #if($table.sortProperties.size() > 0)
    sorting,
    #end*/
    /*vtl#if ($table.itemsVariableName)
    $table.itemsVariableName,
    #end*/
  ]);

  const tableColumns = useMemo<MRT_ColumnDef/*vtl<${table.itemType}>*/[]>(
    () => [
      /*vtl #if ($table.fixedColumn)
      {
        accessorKey: '$table.fixedColumn.name',
        header: '$table.fixedColumn.label',
        #if($table.fixedColumn.sorted) enableSorting: true, #end
        #if($table.fixedColumn.filtered) enableColumnFilter: true, #end
        muiTableHeadCellProps: {
          sx: {
            position: "sticky !important",
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundColor: "white"
          }
        },
        muiTableBodyCellProps: {
          sx: {
            position: "sticky !important",
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundColor: "white"
          }
        },
        #if ($property.dataType == 'object')
        Cell: ({cell}) => {
          return JSON.stringify(cell.getValue())
        }
        #end
      },
      #end
      */
      /*vtl
      #foreach($property in $table.itemProperties)
      #if (!$property.fixedColumn)
      {
        accessorKey: '${property.name}',
        header: '${property.label}',
        enableSorting: #if ($property.sorted) true #else false #end,
        enableColumnFilter: #if ($property.filtered) true #else false #end,
        #if ($property.dataType == 'object')
        Cell: ({cell}) => {
          return JSON.stringify(cell.getValue())
        }
        #end
      },
      #end
      #end*/
    ],
    []
  );

  /*vtl #if(false) */
  const comps = [Box, Typography, CreateButton, EditButton, ExportButton, ShowButton, DeleteButton, Button];
  /*vtl #end */
  /*vtl
  #foreach($action in $table.actions)
    #if ($action.type == 'create' || $action.type == 'export')
      #set($showGlobalActions = true)
    #else
      #set($showRowActions = true)
    #end
  #end
  */

  return (
    <MaterialReactTable /*vtl<${table.itemType}>*/
      columns={tableColumns}
      data={tableData}
      /*vtl
      #if ($table.fixedHeader)
      enableStickyHeader={true}
      #end
      */
      initialState={{
        /*vtl #if($table.rowSize == 'medium') density: 'comfortable', #end*/
        /*vtl #if($table.rowSize == 'small') density: 'compact', #end*/
        /*vtl #if($table.rowSize == 'large') density: 'spacious', #end*/
        /*vtl #if($table.pagination && $table.rowsPerPage)
        pagination: {pageSize: $table.rowsPerPage, pageIndex: 0}
        #end*/
      }}
      enableExpanding={true}
      /*vtl #if ($table.expandableRow)
      renderDetailPanel={({ row }) => {
      if (#foreach($expandIfProp in $table.expandIfSet) #if ($velocityCount > 1) || #end row.original.$expandIfProp.name == null #end) return 'Empty';
        return (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
            }}
          >
          #foreach($expandProp in $table.displayInExpand)
          <Typography>$expandProp.label: {row.original.$expandProp.name}</Typography>
          #end
          </Box>
        );
      }}
      #end*/

      /*vtl
      #if ($table.stripes)
      muiTableBodyProps={{
        sx: {
          '& tr:nth-of-type(odd)': {
            backgroundColor: '#EFEFEF',
          },
        },
      }}
      #end
      */
      state={{
        /*vtl #if($table.filterProperties.size() > 0)
        columnFilters,
        #end*/
        /*vtl #if($table.pagination)
        pagination,
        #end*/
        /*vtl #if($table.sortProperties.size() > 0)
        sorting,
        #end*/
        // isLoading: isTableDataLoading
      }}
      /*vtl
      #if ($table.filterProperties.size() > 0)
      manualFiltering
      onColumnFiltersChange={setColumnFilters}
      #end
      */
      /*vtl
      #if ($table.sortProperties.size() > 0)
      manualSorting
      onSortingChange={setSorting}
      #end
      */
      /*vtl
      #if ($table.pagination)
      manualPagination
      rowCount={rowCount}
      onPaginationChange={setPagination}
      #end
      */
      /*vtl
      #if ($table.hierarchyProperty)
      getSubRows={(originalRow) => originalRow.$table.hierarchyProperty}
      #end
      */
      /*vtl
      #if ($showGlobalActions)
      renderTopToolbarCustomActions={({ table }) => (
          <div>
            #foreach($action in $table.actions)
              #if($action.type == 'create')
              <CreateButton  label="$action.label" />
              #elseif ($action.type == 'export')
              <ExportButton label="$action.label" />
              #end
            #end
          </div>
      )}
      #end
      */
      /*vtl
      #if ($showRowActions)
      enableRowActions
      positionActionsColumn="last"
      renderRowActions={({ row }) => (
          <>
             #foreach($action in $table.actions)
             #if($action.type == 'edit')
             <EditButton label="$action.label" record={row.original} onClick={() => {alert('TODO: specify resource or implement custom edit logic')}}/>
             #elseif($action.type == 'show')
             <ShowButton label="$action.label" record={row.original} onClick={() => {alert('TODO: specify resource or implement custom show logic')}}/>
             #elseif($action.type == 'delete')
             <DeleteButton label="$action.label" record={row.original} onClick={() => {alert('TODO: specify resource or implement custom delete logic')}}/>
             #elseif ($action.type == 'custom')
             <Button label="$action.label" onClick={() => {alert('TODO: implement custom action logic')}}/>
             #end
            #end
          </>
      )}
      #end
      */
    />
  )
}