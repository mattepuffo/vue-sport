<template>
  <div class="grid">

    <div class="col-12">
      <div class="card p-fluid">
        <h5>{{ title }}</h5>
        <div class="field">
          <label for="allenamento">Allenamto</label>
          <Dropdown id="allenamento" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                    placeholder="Seleziona un allenamento"></Dropdown>
        </div>
        <div class="field">
          <label for="email1">Email</label>
          <InputText id="email1" type="text"/>
        </div>
        <div class="field">
          <label for="age1">Age</label>
          <InputText id="age1" type="text"/>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Aggiungi allenamento",
      dropdownItems: [
        {name: 'Option 1', code: 'Option 1'},
        {name: 'Option 2', code: 'Option 2'},
        {name: 'Option 3', code: 'Option 3'}
      ],
      dropdownItem: null
    }
  }
}
</script>
