<template>
  <div class="content">

    <form :model="company" id="company">
        <!--<input type="text" class="hide" name="company-id" id="company-id" value='{{ .Company.ID }}'>-->
        <label class="label">Наименование организации:</label>
        <p class="control">
            <input class="input" type="text" v-model="company.name" placeholder="Наименование организации" required autocomplete="organization">
        </p>
        <!--<label class="label" for="company-scope">Сфера деятельности:</label>
        <div class="control dropdown-search">
            <div class="select is-fullwidth">
                <input type="text" class="hide search-id" name="company-scope-id" value='{{ .Company.ScopeID }}'>
                <input class="input select-input" type="text" name="company-scope" id="company-scope" placeholder="Сфера деятельности" onkeyup="filterClass(this)" onfocus="vd(this)" data-id="{{ .Company.ScopeID }}" autocomplete="off">
                <div class="select-box">
                    <div class="select-item" data-id="0" onclick="sic(this)"></div>
                    {{ range $scope := .ScopesSelect }}
                    <div class="select-item" data-id="{{ $scope.ID }}" onclick="sic(this)">{{ $scope.Name }}</div>
                    {{ end }}
                </div>
            </div>
        </div>-->
        <label class="label">Адрес:</label>
        <p class="control">
            <input class="input" type="text" v-model="company.address" placeholder="Адрес организации" autocomplete="shipping street-address">
        </p>
        <template v-for="(email, index) in company.emails">
          <label class="label">Почта:</label>
            <div class="control is-grouped is-gapless">
              <p class="control is-expanded has-icon">
                <input class="input" type="email" placeholder="Электронный адрес" v-model="email" autocomplete="email">
                <span class="icon is-small">
                  <i class="fa fa-email"></i>
                </span>
              </p>
              <p class="control">
                <a class="button add">+</a>
              </p>
              <p class="control">
                <a class="button is-danger del">-</a>
              </p>
            </div>
          </template>
            <!--</div>-->
            <!--<div class="column is-one-third">
                <div class="phones-group" id="phones-group">
                    {{ if .Company.Phones }}
                        {{ range $index, $phone := .Company.Phones }}
                            {{ if eq $index 0 }}
                            <label class="label" for="phone">Телефоны:</label>
                            {{ end }}
                            <div class="control is-grouped is-gapless">
                                <p class="control is-expanded">
                                    <input type="tel" class="input phone-input" name="phone[]" id="phone" placeholder="Телефон" value="{{ $phone.Phone }}" autocomplete="tel">
                                </p>
                                <p class="control">
                                    <a class="button add" onclick="addPBtn(this)">+</a>
                                </p>
                                <p class="control">
                                    <a class="button is-danger del{{ if eq $index 0 }} is-disabled{{ end }}">-</a>
                                </p>
                            </div>
                        {{ end }}
                    {{ else }}
                        <label class="label" for="phone">Телефоны:</label>
                        <div class="control is-grouped is-gapless">
                            <p class="control is-expanded">
                                <input type="tel" class="input phone-input" name="phone[]" id="phone" placeholder="Телефон" autocomplete="tel">
                            </p>
                            <p class="control">
                                <a class="button add" onclick="addPBtn(this)">+</a>
                            </p>
                            <p class="control">
                                <a class="button is-danger del is-disabled">-</a>
                            </p>
                        </div>
                    {{ end }}
                </div>
            </div>
            <div class="column is-one-third">
                <div class="faxes-group" id="faxes-group">
                    {{ if .Company.Faxes }}
                        {{ range $index, $fax := .Company.Faxes }}
                            {{ if eq $index 0 }}
                            <label class="label" for="fax">Факсы:</label>
                            {{ end }}
                            <div class="control is-grouped is-gapless">
                                <p class="control is-expanded">
                                    <input type="tel" class="input phone-input" name="fax[]" id="fax" placeholder="Факс" value="{{ $fax.Phone }}" autocomplete="tel">
                                </p>
                                <p class="control">
                                    <a class="button add" onclick="addFBtn(this)">+</a>
                                </p>
                                <p class="control">
                                    <a class="button is-danger del{{ if eq $index 0 }} is-disabled{{ end }}">-</a>
                                </p>
                            </div>
                        {{ end }}
                    {{ else }}
                        <label class="label" for="fax">Факсы:</label>
                        <div class="control is-grouped is-gapless">
                            <p class="control is-expanded">
                                <input type="tel" class="input phone-input" name="fax[]" id="fax" placeholder="Факс" autocomplete="tel">
                            </p>
                            <p class="control">
                                <a class="button add" onclick="addFBtn(this)">+</a>
                            </p>
                            <p class="control">
                                <a class="button is-danger del is-disabled">-</a>
                            </p>
                        </div>
                    {{ end }}
                </div>
            </div>
        </div>
        {{ if .Company.Practices }}
            {{ range $index, $practice := .Company.Practices }}
                {{ if eq $index 0 }}
                <label class="label" for="company-practice">Тренировки:</label>
                {{ end }}
                <div class="control">
                    <p class="control">
                        <input type="text" class="input is-disabled" {{ if eq $index 0 }} id="company-practice" {{ end }} value='{{ $practice.DateOfPractice }} {{ $practice.Kind.Name }} {{ $practice.Topic }}'>
                    </p>
                </div>
            {{ end }}
        {{ end }}
        {{ if .Company.Contacts }}
            {{ range $index, $contact := .Company.Contacts }}
                {{ if eq $index 0 }}
                <label class="label" for="company-contacts">Сотрудники:</label>
                {{ end }}
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <a href="/contact/edit/{{ $contact.ID }}">
                            <input type="text" class="input is-disabled" {{ if eq $index 0 }} id="company-contact" {{ end }} value='{{ $contact.Name }}'>
                        </a>
                    </p>
                    <p class="control is-expanded">
                        <input type="text" class="input is-disabled" value='{{ $contact.PostName }}'>
                    </p>
                </div>
            {{ end }}
        {{ end }}
        <label class="label" for="company-note">Заметка:</label>
        <div class="control">
            <input type="text" class="input" name="company-note" id="company-note" placeholder="Заметка" value='{{ .Company.Note }}'>
        </div>
        <div class="columns mt3">
            <div class="column is-2 is-offset-2">
                <p class="control">
                    <a class="button is-primary" id="submit-button">Сохранить</a>
                </p>
            </div>
            <div class="column is-2">
                <p class="control">
                    <a class="button" href="{{ .PrevPage.URL }}" id="close-button">Закрыть</a>
                </p>
            </div>
            <div class="column is-2 is-offset-2">
                <p class="control">
                    <a class="button is-danger" href="/company/delete/{{ .Company.ID }}{{ .PrevPage.Query }}" id="delete-button"  onclick="return confirm('Вы действительно хотите удалить эту запись?');">Удалить</a>
                </p>
            </div>
        </div>-->
    </form>
  </div>

  <!--<el-form ref="form" :model="company" label-position="top">
      <el-form-item label="Наименование организации:">
        <el-input v-model="company.name"></el-input>
      </el-form-item>
      <el-form-item label="Сфера деятельности:">
        <el-select v-model="company.scope_id" placeholder="Сфера деятельности">
          <el-option label="Отсутствует" value="0" key="0"></el-option>
          <el-option v-for="scope in scopes" :label="scope.name" :value="scope.id" :key="scope.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Адрес организации:">
        <el-input v-model="company.address"></el-input>
      </el-form-item>
      <el-form-item v-for="(email, index) in company.emails" label="Почта организации:" :key="index" :prop="'emails.' + index + '.value'">
        <el-input v-model="email.email"></el-input>
      </el-form-item>
      <el-form-item v-for="(phone, index) in company.phones" label="Телефон организации:" :key="index" :prop="'phones.' + index + '.value'">
        <el-input v-model="phone.value"></el-input>
      </el-form-item>
      <el-form-item v-for="(fax, index) in company.faxes" label="Факс организации:" :key="index" :prop="'faxes.' + index + '.value'">
        <el-input v-model="fax.value"></el-input>
      </el-form-item>
      <el-form-item v-if="company.practices" label="Тренировки организации:">
        <el-input v-for="(item, index) in company.practices" :value="item.date_of_practice + ' ' + item.kind.name + ' ' + item.topic" :key="index"></el-input>
      </el-form-item>
      <el-form-item v-if="company.contacts" label="Сотрудники организации:">
        <el-input v-for="(item, index) in company.contacts" :value="item.name + ' ' + item.post_name" :key="index"></el-input>
      </el-form-item>
      <el-form-item label="Заметка:">
        <el-input v-model="company.note"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Сохранить</el-button>
        <el-button>Закрыть</el-button>
        <el-button type="danger" @click="onDelete">Удалить</el-button>
      </el-form-item>
  </el-form>-->
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'company',
    data () {
      return {
        scopes: [{
          id: 0,
          name: ''
        }],
        company: {
          id: 0,
          name: '',
          scope_id: '',
          scope: {
            id: 0,
            name: ''
          },
          address: '',
          emails: [{
            id: 0,
            email: ''
          }],
          phones: [{
            id: 0,
            phone: ''
          }],
          faxes: [{
            id: 0,
            phone: ''
          }],
          practices: [{
            id: 0,
            date_of_practice: '',
            kind: {
              id: 0,
              name: ''
            },
            topic: ''
          }],
          contacts: [{
            id: 0,
            name: '',
            post_name: ''
          }],
          note: ''
        }
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      onDelete () {
        console.log('delete!')
      },
      fetchData () {
        axios.get('http://localhost:9090/api/company/' + this.$route.params.id)
        .then(response => {
          const jsondata = response.data
          if (jsondata) {
            this.company = jsondata.company
            this.scopes = jsondata.scopes_select
            // console.log(jsondata.company.Contacts)

            this.isLoaded = true
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>
