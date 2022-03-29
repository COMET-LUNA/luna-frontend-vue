<script setup lang="ts">
  defineProps({
    sideData: Array
  })

  const sampleData = [
    {
      title: 'Sample Title 1',
      desc: 'Sample Description to this title.'
    },
    {
      title: 'Sample Title 2',
      desc: 'Sample Description to this title.'
    }
  ]
</script>

<style src="../css/Sidebar.css"></style>

<template>
  <!-- <div className='w-100'>
      {
        this.props.sidedata.map((item,index)=>{
          return (
              <>
                  <div className='w-100 mb-1 row'>
                      <div className='col-3'>
                          {this.progressChecker(item.progress)}
                          {
                              index !== this.props.sidedata.length-1 && <img src={line} alt='logo' width='50px'/>
                          }  
                      </div>
                      <div className='col-9'>
                          <div className="hover-effect cursor-pointer rounded-3 py-2 px-3" onClick={() => {this.props.changeProgress(index + 1)}}>
                            <span style={{fontWeight: 'bolder'}}>{item.title}</span> <br/>
                            <span>{item.desc}</span>
                          </div>       
                      </div> 
                  </div>
              </>
          )
        })
      }
  </div> -->

  <div class="w-100">
    <div v-for="item in sampleData" class="w-100 mb-1 row">
      <div class="col-3">

      </div>
      <div class="col-9">
        <div className="hover-effect cursor-pointer rounded-3 py-2 px-3">
          <span>{{item.title}}</span> <br/>
          <span>{{item.desc}}</span>
        </div>  
      </div>
    </div>
  </div>
</template>