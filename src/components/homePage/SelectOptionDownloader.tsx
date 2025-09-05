import { ComicSelect } from '../UI';


export const SelectOptionDownloader = () => {
   return (
      <div>
         <ComicSelect
            value={''}
            options={[{ value: '1', label: 'MP4' }, { value: '2', label: 'WEBM' }]}
            placeholder='Formato'
            onChange={() => { }}
         />

         <ComicSelect
            value={''}
            options={[{ value: '2', label: 'MP4' }, { value: '2', label: 'WEBM' }]}
            placeholder='Calidad'
            onChange={() => { }}
         />
      </div>
   )
}
