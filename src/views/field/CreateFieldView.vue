<template>
 <NewObject :properties="properties" :url="url"></NewObject>
</template>

<script>
import NewObject from '../../components/NewObject.vue'
export default {
    name:'CreateFieldView',
    components:{
        NewObject
    },
    data() {
        return {
            properties:[
            {
                'type':'text',
                'name': 'name',
                'placeholder': 'Tarla Adı',
                'value':null,
                'step':'0.01'
            },
            {
                'type':'number',
                'name': 'decare',
                'placeholder': 'Dönümü',
                'value':null,
                'step':'0.01'
            }
        ],
        url:"http://localhost:8081/api/v1/field"
        }
    },
}
</script>

<style>

</style>