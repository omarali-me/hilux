import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceSearch'
})


export class ServiceSearchPipe implements PipeTransform {

  transform(dataIn: any, filterKeyword: string): any[] {


    if (!dataIn) { return []; }
    if (!filterKeyword) { return dataIn; }




    return dataIn.filter(item => {

      // console.log();
      // _.keys(item.value.services).forEach( key => {
      //   console.log(key);

      // if (Array.isArray(formData[key])) {
      //   formData[key].forEach(element => {
      //     if (element.hasOwnProperty(source)) {
      //       if (element[source])
      //         options.push(this.prepareObj(element, source));
      //     }
      //   })
      // }
    });
    // return item.value.serviceCategoryName.ar.includes(filterKeyword);

    // Object.entries(item.value.services).forEach(([key, value]) => {


    //   return value.filter(item => {
    //     console.log(`${key}
    //     ${item.ar}
    //     ${item.en}`); // key - value
    //   });

    // });



}

}
