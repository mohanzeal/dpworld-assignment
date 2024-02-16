<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";
import { getPaginatedUsers } from "../modules/common/common.api";
import ImageFrames from "./ImageFrames.vue";

const $q = useQuasar();
const startDateFilter = ref("2019/02/01");
const endDateFilter = ref("2019/02/01");
const columns = [
  {
    name: "_id",
    required: true,
    label: "ID",
    align: "left",
    field: "_id",
    format: (val: string) => `${val}`,
  },
  {
    name: "name",
    align: "center",
    label: "PERSON NAME",
    field: "name",
  },
  {
    name: "createdAt",
    label: "DATE & TIME",
    field: "createdAt",
    align: "center",
  },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions",
  },
];
const rows = ref([]);
const titleSearch = ref("");
const tableRef = ref();
const loading = ref(false);
const defaultPaginationParams = {
  sortBy: "createdAt",
  descending: true,
  page: 1,
  rowsPerPage: getItemsPerPage() || 10,
  rowsNumber: 0,
};
const pagination = ref(JSON.parse(JSON.stringify(defaultPaginationParams)));

watch(
  () => $q.screen.name,
  () => {
    pagination.value.rowsPerPage = getItemsPerPage();
  }
);

function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 4;
  }

  return 6;
}

async function onRequest(params: any) {
  loading.value = true;

  // fetch data from "server"
  const { data: paginatedResponse } = await getPaginatedUsers({
    // search name
    searchVal: params.filter,
    searchField: "name",
    // pagination fields
    ...params.pagination,
    rowsPerPage: params.pagination.rowsPerPage || getItemsPerPage(),
  });

  // set total records
  pagination.value.rowsNumber = paginatedResponse.total;
  // clear out existing data and add new
  rows.value = paginatedResponse.records;

  // calculate starting row of data
  // const startRow = (props.pagination?.page - 1) * props.pagination?.rowsPerPage;

  pagination.value.page = paginatedResponse.current;
  pagination.value.rowsPerPage = paginatedResponse.pageSize;
  pagination.value.sortBy = paginatedResponse.sortField;
  pagination.value.descending =
    paginatedResponse.sortOrder == "-1" ? true : false;
  // ...and turn of loading indicator
  loading.value = false;
}

const loadResumesList = () => {
  tableRef.value.requestServerInteraction();
};

onMounted(() => {
  // get initial data from server (1st page)
  loadResumesList();
});

const currentUserId = ref("");
const showImageDialog = ref(false);

const toggleImageDialog = (row: any) => {
  showImageDialog.value = true;
  currentUserId.value = row._id;
};
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="User Images List"
      :columns="(columns as any)"
      row-key="id"
      :loading="loading"
      class="rounded-borders"
      ref="tableRef"
      :rows="rows"
      v-model:pagination="pagination"
      :filter="titleSearch"
      binary-state-sort
      @request="onRequest"
      :rows-per-page-items="getItemsPerPage"
    >
      <template v-slot:top>
        <q-btn
          to="/"
          flat
          icon="chevron_left"
          class="q-ma-sm"
          round
          color="primary"
        ></q-btn>
        <div class="text-h6 text-bold">User Image List</div>
        <q-space />
        Filters:
        <div class="row items-center">
          <q-input
            class="col-xs-4 q-mt-md q-px-sm"
            dense
            filled
            v-model="startDateFilter"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="startDateFilter">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            class="col-xs-4 q-mt-md q-px-sm"
            dense
            filled
            v-model="endDateFilter"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="endDateFilter">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            dense
            class="col-xs-4"
            debounce="300"
            color="primary"
            v-model="titleSearch"
            placeholder="Search name"
            clearable
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :key="'_id'" :props="props">
            <div>
              {{ props.row["_id"] }}
            </div>
          </q-td>
          <q-td :key="'name'" :props="props">
            <div>
              {{ props.row["name"] }}
            </div>
          </q-td>
          <q-td :key="'createdAt'" :props="props">
            <div>
              {{ props.row["createdAt"] }}
            </div>
          </q-td>

          <q-td :key="'actions'" :props="props" class="text-center">
            <div class="row items-center justify-center q-gutter-xs">
              <q-btn
                label="Show Images"
                size="xs"
                color="primary"
                @click="toggleImageDialog(props.row)"
              >
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:no-data="{ message }" v-if="!loading">
        <div class="full-width column text-center">
          <div class="text-center q-my-md">No Data Found.</div>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="showImageDialog">
      <div style="width: 700px; max-width: 80vw">
        <ImageFrames
          v-if="showImageDialog && currentUserId"
          :user-id="currentUserId"
        />
      </div>
    </q-dialog>
  </div>
</template>
