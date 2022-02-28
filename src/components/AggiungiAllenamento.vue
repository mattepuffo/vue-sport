<template>

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
        <Button type="button" label="Search" icon="pi pi-save" :loading="loading[0]" @click="submit()"/>
      </div>

    </div>

  </div>

  <Toast position="top-center"/>

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
      allService: null,
      loading: [false, false, false]
    }
  },
  validations() {
    return {
      selctedAllenamento: {required},
      selectedData: {required},
      selectedNote: {required}
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
    async submit() {
      const result = await this.v$.$validate()
      if (!result) {
        this.$toast.add({
          severity: 'error',
          summary: 'Allenamento, data e note sono obbligatori!',
          life: 3000
        });
      } else {
        const data = {
          'allenamento': this.selctedAllenamento,
          'data': this.selectedData,
          'note': this.selectedNote,
          'finito': this.selectedFinito
        };

        // console.log(data);

        this.allService.addAllenamento(data)
            .then(res => {
              if (res.res === 'ok') {
                location.href = '/';
              } else {
                this.$toast.add({
                  severity: 'error',
                  summary: res.message,
                  life: 3000
                });
              }
            });
      }
    }
  }
}
</script>
