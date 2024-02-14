<script setup lang="ts">
import { ref } from "vue";

const startDateFilter = ref("2019/02/01");
const endDateFilter = ref("2019/02/01");
const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row: { name: string }) => row.name,
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    align: "center",
    label: "PERSON NAME",
    field: "name",
    sortable: true,
  },
  {
    name: "createdAt",
    label: "DATE & TIME",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions",
    sortable: true,
  },
];

const originalRows = [
  {
    id: "34567asdf",
    name: "Prakash",
    createdAt: "23/12/2024 4:00:00",
  },
  {
    id: "34567sdfasdf",
    name: "Mohan",
    createdAt: "24/12/2024 4:00:00",
  },
  {
    id: "34567sdfasdf",
    name: "Sowjanya",
    createdAt: "24/12/2024 4:00:00",
  },
];
const loading = ref(false);
const filter = ref("");
const rows = ref([...originalRows]);
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="(columns as any)"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="text-h6 text-bold">Image List</div>
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
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :key="'id'" :props="props">
            <div>
              {{ props.row["id"] }}
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
              <q-btn label="Show Image" size="xs" color="primary"> </q-btn>
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
  </div>
</template>
