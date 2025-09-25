<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>{{ title }}</h5>
        <p>Totale: {{ allenamenti ? allenamenti.length : 0 }}</p>

        <div>
          <DataTable :value="allenamenti"
                     :paginator="true"
                     :rows="20"
                     :rowsPerPageOptions="[10, 20, 50]"
                     :rowHover="true"
                     responsiveLayout="stack"
                     breakpoint="960px"
                     showGridlines currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                     paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">

            <template #empty>
              Nessun allenamento
            </template>

            <Column field="data" header="Data"></Column>

            <Column header="Note">
              <template #body="allProps">
                <span v-html="allProps.data.note"></span>
              </template>
            </Column>

            <Column header="">
              <template #body="allProps">

                <router-link :to="{ name: 'aggiungi', params: { id: allProps.data.id, dup: 'true' }}">
                  <Button icon="pi pi-copy" class="p-button-rounded p-button-info mr-2"/>
                </router-link>

                <router-link :to="{ name: 'aggiungi', params: { id: allProps.data.id }}">
                  <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2"/>
                </router-link>

                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2"
                        @click="del(allProps.data.id)"/>

              </template>
            </Column>

          </DataTable>
        </div>

      </div>
    </div>
  </div>

  <ConfirmDialog></ConfirmDialog>

</template>

<script>
import AllenamentiService from "@/service/AllenamentiService";
import {FilterMatchMode} from "primevue/api";
// import {copyText} from 'vue3-clipboard';

export default {
  data() {
    return {
      title: "Lista Test",
      allService: null,
      allenamenti: null,
      filters1: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      },
      // loading1: true
    }
  },
  created() {
    this.allService = new AllenamentiService();
  },
  mounted() {
    this.getListaTest();
  },
  methods: {
    getListaTest() {
      this.allService.getListaTest().then(data => {
        this.allenamenti = data;
        // this.loading1 = false;
      });
    },
    del(id) {
      this.$confirm.require({
        message: 'Sei sicuro di voler cancellare questo allenamento?',
        header: 'Conferma cancellazione',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'SI',
        accept: () => {
          const data = {
            id
          };

          this.allService.delAllenamento(data).then(() => {
            this.getAllenamenti();
          });
        },
        reject: () => {
          this.$confirm.close();
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep(.p-paginator) {

  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: .5rem;
  background-color: #D8DADC;

  .p-progressbar-value {
    background-color: #607D8B;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}
</style>
