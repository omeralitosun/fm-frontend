<template>
<ObjectDetail :url="url" :fieldName="fieldName"></ObjectDetail>
</template>

<script>
import ObjectDetail from '@/components/ObjectDetail.vue';
export default {
    name:'FieldDetailView',
    props:{
        id:String
    },
    components:{
        ObjectDetail
    },
    data() {
        return {
            fieldName:["Tarla İsmi","Dönüm"],
            url:"http://localhost:8081/api/v1/field/"+this.id
        }
    }
}
</script>

<style>

</style>