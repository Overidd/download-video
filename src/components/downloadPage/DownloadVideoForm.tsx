import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { ITypeFormat, IVideoInfo } from '@/interface';
import { ButtonComic, SelectFormat } from '../UI';
import { useForm, useMediaFormats } from '@/hook';

interface Props {
  info: IVideoInfo;
  onSubmit: (options: ITypeFormat, type: 'video' | 'playlist') => void;
  className?: string;
}

export const DownloadVideoForm = ({
  info,
  onSubmit,
  className
}: Props) => {

  const {
    videos,
    audios
  } = useMediaFormats(info.formats);

  const {
    onSubmitForm,
    onValueChange,
    formState: {
      formatIdAudio,
      formatIdVideo
    },
    formValidation: {
      formatIdAudioValid,
      formatIdVideoValid
    }
  } = useForm({
    initialState: {
      formatIdVideo: null,
      formatIdAudio: null
    },
    activeValidation: true,
    // validations: [],
  })

  const handleSubmit = onSubmitForm((options) => {
    onSubmit(options, 'video');
  });

  return (
    <div className={cn(
      'flex gap-2 w-[20rem]',
      className
    )}>
      <form
        onSubmit={handleSubmit}
      >
        <SelectFormat
          formats={videos}
          type='video'
          name='formatIdVideo'
          value={formatIdVideo}
          onChange={onValueChange}
          isError={!!formatIdVideoValid}
        />

        <SelectFormat
          formats={audios}
          type='audio'
          name='formatIdAudio'
          onChange={onValueChange}
          value={formatIdAudio}
          isError={!!formatIdAudioValid}
        />

        <ButtonComic
          type='button'
          variant='outline'
          className='uppercase h-full'
        >
          <Download
            className='w-4 h-4 mr-2'
          />
          Descargar
        </ButtonComic>
      </form>
    </div>
  )
}