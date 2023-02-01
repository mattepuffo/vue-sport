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
                    dateFormat="dd/mm/yy" />
        </div>

        <div class="field">
          <label for="note">Note</label>
          <Editor id="note" v-model="selectedNote" editorStyle="height: 120px"
                  autocapitalize="none" />
        </div>
      </div>

      <div class="field">
        <label for="finito">Finito</label>
        <br>
        <InputSwitch id="finito" v-model="selectedFinito" />
      </div>

      <div class="field">
        <Button type="button" label="Salva" icon="pi pi-save" @click="submit()" />
      </div>

    </div>

  </div>

  <Toast position="top-center" />

</template>

<script>
import AllenamentiService from "../service/AllenamentiService";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import voca from "voca";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      allId: null,
      dup: null,
      title: "Aggiungi / modifica allenamento",
      allenamenti: null,
      selctedAllenamento: null,
      selectedData: null,
      selectedNote: null,
      selectedFinito: true,
      allService: null
    };
  },
  validations() {
    return {
      selctedAllenamento: { required },
      selectedData: { required },
      selectedNote: { required }
    };
  },
  created() {
    this.allService = new AllenamentiService();

    this.allId = this.$route.params.id;
    this.dup = this.$route.params.dup;

    if (!voca.isEmpty(this.allId)) {
      this.allService.getById(this.allId).then(data => {
        const as = data[0];

        this.selctedAllenamento = as.a_id;
        if (voca.isEmpty(this.dup)) {
          this.selectedData = as.start;
        }
        this.selectedNote = as.note;
        this.selectedFinito = (as.finito == 1) ? true : false;
      });
    }

    if (!voca.isEmpty(this.dup)) {
      this.allId = "";
    }
  },
  mounted() {
    this.allService.getTipi().then(data => {
      this.allenamenti = data;
    });
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) {
        this.$toast.add({
          severity: "error",
          summary: "Allenamento, data e note sono obbligatori!",
          life: 3000
        });
      } else {
        const dd = new Date(this.selectedData);
        let data = {
          "allenamento": this.selctedAllenamento,
          "data": dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate(),
          "note": this.selectedNote,
          "finito": this.selectedFinito
        };

        if (voca.isEmpty(this.allId)) {
          this.allService.addAllenamento(data)
            .then(res => {
              if (res.res === "ok") {
                location.href = "/sport";
              } else {
                this.$toast.add({
                  severity: "error",
                  summary: res.message,
                  life: 3000
                });
              }
            });
        } else {
          data.id = this.allId;

          this.allService.upAllenamento(data)
            .then(res => {
              if (res.res === "ok") {
                location.href = "/sport";
              } else {
                this.$toast.add({
                  severity: "error",
                  summary: res.message,
                  life: 3000
                });
              }
            });
        }

        // console.log(data);

      }
    }
  }
};
</script>
