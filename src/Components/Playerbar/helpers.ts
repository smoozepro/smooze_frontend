import { duration, Slider, styled } from '@mui/material';

export const PSlider = styled(Slider)(({ theme, ...props }: any) => ({
  color: 'silver',
  height: 2,
  width: 100,
  top: -5,
  '&:hover': {
    cursor: 'auto'
  },
  '& .MuiSlider-thumb': {
    width: '13px',
    height: '13px'
    // display: props.thumbless ? 'none' : 'block',
  }
}));

export const PSliderLong: any = styled(Slider)(({ theme, ...props }: any) => ({
  color: 'silver',
  height: 2,
  width: 580,
  percent: 50,
  top: -1,
  '&:hover': {
    cursor: 'auto'
  },
  '& .MuiSlider-thumb': {
    width: '13px',
    height: '13px',
    display: props.thumbless ? 'none' : 'block'
  }
}));

export function formatTime(time: any): any {
  if (time && !isNaN(time)) {
    const minutes =
      Math.floor(time / 60) < 10
        ? `0${Math.floor(time / 60)}`
        : Math.floor(time / 60);
    const seconds =
      Math.floor(time % 60) < 10
        ? `0${Math.floor(time % 60)}`
        : Math.floor(time % 60);

    return `${minutes}:${seconds}`;
  }
  return '00:00';
}
