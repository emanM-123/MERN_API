import React, { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import { useStore } from "laco-react";
import Box from "@material-ui/core/Box";
import { useSnackbar } from "notistack";
import DialogActions from "../component/DialogActions";
import TextField from "../component/TextField";
import Button from "../component/Button";
import { createTask, editTask, getAllTask } from "../services";
import { TaskStore } from "./TaskStore";
import TextareaAutosize from "../component/Textarea";

import SelectInput from "../component/SelectInput";
// import BasicDatePicker from "../component/DatePickers";
const useStyles = makeStyles((theme) => ({
  createBtn: {
    borderRadius: 5,
    width: 200,
    marginLeft: 20,
    marginRight: 20
  },
  // selectInput: {
  //   margin: dance
  // },

  applyFilterBtn: {
    borderRadius: 5,
  },
  inputLabel: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
}));

export default function CreateTask() {
  const classes = useStyles();

  const {paginationProps, selectedEditObj, isOpenDialog, listData } = useStore(TaskStore);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      {"Dismiss"}
    </Button>
  );
  const options = [
    {
      status: "Select Status",
      value: "",
    },
    {
      status: "Completed",
      value: "Completed",
    },
    {
      status: "Pending",
      value: "Pending",
    },
  ];

  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState();
  const [searchFilterObj,setSearchFilterObj] = useState({});
  const loadTask = (pagination = paginationProps) => {
    const query = {
      $limit: pagination.rowsPerPage ? pagination.rowsPerPage : 20,
      $skip:
          pagination.page > 0
              ? pagination.page * pagination.rowsPerPage
              : 0,
        status: searchFilterObj.status ? searchFilterObj.status : '',
    };
    getAllTask( query )
        .then((response) => {
          const {data,limit,skip,total} = response.data;
          TaskStore.set(
            () => ({listData:{ data:data,hasMore:total>(limit+skip)}, paginationProps: { ...pagination, count:total}  }),
            'TaskStore-data-loader'
        );
            setLoading(false);
        })
        .catch((error) => {
            enqueueSnackbar(error.message, { action, variant: 'error' });
        });
};
  const updateValue = (obj) => {
    TaskStore.set(
      () => ({
        selectedEditObj: { ...selectedEditObj, ...obj },
      }),
      "TaskStore-Create-Dialog-Open"
    );
  };
  const onCancel = () => {
    TaskStore.set(
      () => ({
        isOpenDialog: false,
        showDetails: false,
        selectedEditObj: {
          title: "",
          description: "",
          dueDate: "",
        },
      }),
      "TaskStore-Create-Dialog-close"
    );
    setErrorObj({});
  };

  const validateForm = () => {
    let errorList = {};
    if (!selectedEditObj.title) {
      errorList.title = "Please enter task title";
    }
    if (!selectedEditObj.dueDate) {
      errorList.dueDate = "Please enter task title";
    }
    if (Object.keys(errorList).length === 0) {
      setErrorObj({});
      return true;
    } else {
      setErrorObj(errorList);
      errorList = {};
      return false;
    }
  };
  const createEditData = () => {
    if (!validateForm()) return;
    setLoading(true);
    if (selectedEditObj._id) {
      const { _id, description, title, dueDate } = selectedEditObj;
      editTask({
        _id,
        description,
        title,
        dueDate,
      })
        .then((response) => {
          let index = listData.data.findIndex(
            (item) => item._id === selectedEditObj._id
          );
          let list = [...listData.data];
          list.splice(index, 1, response.data);
          TaskStore.set(
            () => ({ listData: { data: list, hasMore: listData.hasMore } }),
            "TaskStore-edit"
          );
          setLoading(false);
          onCancel();
          enqueueSnackbar("Successfully Edited", {
            action,
            variant: "success",
          });
        })
        .catch((error) => {
          setLoading(false);
          const {
            response: { data },
          } = error;
          enqueueSnackbar(
            data && data.message
              ? data.message
              : "Something went wrong! refresh and try again.",
            { action, variant: "error" }
          );
        });
    } else {
      createTask({
        description: selectedEditObj.description,
        title: selectedEditObj.title,
        dueDate: selectedEditObj.dueDate,
      })
        .then((response) => {
          TaskStore.set(
            () => ({
              listData: {
                data: [response.data, ...listData.data],
                hasMore: listData.hasMore,
              },
            }),
            "TaskStore-add-new"
          );
          onCancel();
          setLoading(false);
          enqueueSnackbar("Successfully Added", { action, variant: "success" });
        })
        .catch((error) => {
          const {
            response: { data },
          } = error;
          setLoading(false);
          enqueueSnackbar(
            data && data.message
              ? data.message
              : "Something went wrong! refresh and try again.",
            { action, variant: "error" }
          );
        });
    }
  };
  useEffect(()=>{
    loadTask();
},[searchFilterObj]);
  return (
    <>
      <div style={{display:"flex"}} mr={2}>
        <SelectInput 
          margin = "dance"
          valueKey="value"
          labelKey="status"
          options={options}
          selectProps={{
            onChange: (event) => {
              // setStatusUpdate(true);
              setSearchFilterObj({
                ...searchFilterObj,
                status: event.target.value,
              });
            },
          }}
        />
        <Button
          onClick={() => {
            TaskStore.set(
              () => ({ isOpenDialog: true }),
              "TaskStore-Create-Dialog-Open"
            );
          }}
          className={classes.createBtn}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
        
      </div>

      <Dialog
        fullWidth
        maxWidth={"sm"}
        onClose={onCancel}
        open={isOpenDialog}
        PaperProps={{ className: classes.subjectFilterDialogContent }}
      >
        <DialogContent>
          <Box mb={2}>
            <InputLabel className={classes.inputLabel}>Title*</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Title"
              error={!!errorObj.title}
              helperText={errorObj.title}
              onChange={(event) => {
                updateValue({ title: event.target.value });
              }}
              value={selectedEditObj.title}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <InputLabel className={classes.inputLabel}>Description</InputLabel>
            <TextareaAutosize
              rows={4}
              fullWidth
              error={!!errorObj.description}
              helperText={errorObj.description}
              placeholder="please write a Description..."
              onChange={(event) => {
                updateValue({ description: event.target.value });
              }}
              value={selectedEditObj.description}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <InputLabel className={classes.inputLabel}>Due Date</InputLabel>

            <input
              style={{ width: "98%" }}
              className={classes.inputLabel}
              type="date"
              value={selectedEditObj.dueDate}
              onChange={(event) => {
                updateValue({ dueDate: event.target.value });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.applyFilterBtn}
            onClick={onCancel}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>

          <Button
            className={classes.applyFilterBtn}
            onClick={createEditData}
            loading={loading}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
