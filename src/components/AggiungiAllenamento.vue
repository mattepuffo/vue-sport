<template>
  <form @submit.prevent="onSubmit">

    <div class="grid">

      <div class="col-12">
        <div class="card p-fluid">
          <h5>{{ title }}</h5>

          <div class="field">
            <label for="allenamento">Allenamento</label>
            <Dropdown id="allenamento" v-model="selctedAllenamento" :options="allenamenti"
                      optionLabel="label" optionValue="value" :filter="true" :showClear="true"
                      placeholder="Seleziona un allenamento"></Dropdown>
          </div>

          <div class="field">
            <label for="data">Data</label>
            <Calendar id="data" v-model="selectedData" :showButtonBar="true" :touchUI="true" :showIcon="true"
                      dateFormat="dd/mm/yy"/>
          </div>

          <div class="field">
            <label for="note">Note</label>
            <Editor id="note" v-model="selectedNote" editorStyle="height: 320px"/>
          </div>
        </div>

        <div class="field">
          <label for="finito">Finito</label>
          <br>
          <InputSwitch id="finito" v-model="selectedFinito"/>
        </div>

        <div class="field">
          <Button type="button" label="Search" icon="pi pi-save" :loading="loading[0]" @click="load(0)"/>
        </div>

      </div>

    </div>

  </form>
</template>

<script>
import AllenamentiService from '../service/AllenamentiService';
import useVuelidate from '@vuelidate/core';
import {required} from '@vuelidate/validators';

// https://vuelidate-next.netlify.app/guide.html

export default {
  name: 'Aggiungi allenamento',
  allService: null,
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      title: "Aggiungi allenamento",
      allenamenti: null,
      selctedAllenamento: null,
      selectedData: null,
      selectedNote: null,
      selectedFinito: true,
      loading: [false, false, false]
    }
  },
  validations() {
    return {
      form: {
        selctedAllenamento: {
          required
        }
      }
    }
  },
  created() {
    this.allService = new AllenamentiService();
  },
  mounted() {
    this.allService.getTipi().then(data => {
      this.allenamenti = data;
    });
  },
  methods: {
    load(index) {
      this.loading[index] = true;
      setTimeout(() => this.loading[index] = false, 1000);
    }
  }
}
</script>
