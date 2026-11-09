import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const listPage = style({
  width: '100%',
  maxWidth: '1044px',
  margin: '0 auto',
  padding: '24px 24px 96px',
  '@media': { '(max-width: 640px)': { padding: '16px 16px 64px' } },
});
export const pageTitle = style({ margin: '0 0 16px', fontSize: '20px', fontWeight: 700 });
export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '24px',
  '@media': { '(max-width: 640px)': { gap: '8px', marginBottom: '16px' } },
});
export const filterMenu = style({ position: 'relative', flex: 'none', zIndex: 8 });
export const filterToggle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '112px',
  minHeight: '40px',
  padding: '0 14px',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '22px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  listStyle: 'none',
  color: vars.colorGray600,
  fontSize: '14px',
  '@media': { '(max-width: 640px)': { width: '100px' } },
});
globalStyle(filterToggle + '::-webkit-details-marker', { display: 'none' });
export const filterPanel = style({
  position: 'absolute',
  top: '48px',
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '290px',
  maxWidth: 'calc(100vw - 32px)',
  padding: '18px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 8px 24px rgba(0,0,0,.13)',
});
export const filterField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontSize: '14px',
  fontWeight: 600,
});
globalStyle(filterField + ' select', {
  width: '100%',
  minHeight: '40px',
  padding: '0 12px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '8px',
  backgroundColor: '#fff',
  fontSize: '14px',
});
export const searchWrap = style({ minWidth: 0, flex: 1 });
export const stateMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minHeight: '180px',
  padding: '24px',
  fontSize: '15px',
  color: vars.colorGray600,
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '12px',
  backgroundColor: vars.colorGray50,
});
export const cards = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: '40px',
});
export const cardShell = style({ position: 'relative', minWidth: 0 });
export const actionMenu = style({
  position: 'absolute',
  top: '12px',
  right: '14px',
  zIndex: 5,
  selectors: { '&[open]': { zIndex: 9 } },
});
globalStyle(actionMenu + ' summary', {
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '24px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  color: vars.colorGray700,
  listStyle: 'none',
});
globalStyle(actionMenu + ' summary::-webkit-details-marker', { display: 'none' });
globalStyle(actionMenu + ' summary:focus-visible', { outline: '3px solid ' + vars.colorBrand2 });
export const actionPopover = style({
  position: 'absolute',
  top: '35px',
  right: 0,
  width: '139px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 6px 18px rgba(0,0,0,.14)',
  overflow: 'hidden',
});
globalStyle(actionPopover + ' a, ' + actionPopover + ' button, ' + actionPopover + ' span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '42px',
  width: '100%',
  padding: '0 12px',
  fontSize: '14px',
  color: vars.colorGray800,
  backgroundColor: 'transparent',
});
globalStyle(actionPopover + ' button', { borderTop: '1px solid ' + vars.colorGray200 });
globalStyle(actionPopover + ' a:hover, ' + actionPopover + ' button:hover', {
  backgroundColor: vars.colorGray100,
});
export const disabledAction = style({ opacity: 0.5, cursor: 'not-allowed' });
export const deletedBadge = style({
  position: 'absolute',
  top: '16px',
  right: '16px',
  padding: '4px 10px',
  fontSize: '13px',
  fontWeight: 700,
  color: vars.colorGray600,
  backgroundColor: vars.colorGray200,
  borderRadius: '6px',
});
export const modalActions = style({ display: 'flex', justifyContent: 'flex-end', gap: '8px' });
export const modalMessage = style({ margin: '0 0 20px', fontSize: '16px', lineHeight: 1.6 });
export const reasonLabel = style({
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: 700,
});
export const reasonInput = style({
  display: 'block',
  width: '100%',
  padding: '12px',
  resize: 'vertical',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '8px',
  fontSize: '14px',
  lineHeight: 1.5,
  selectors: { '&:focus-visible': { outline: '2px solid ' + vars.colorBrand2 } },
});
export const errorText = style({ margin: '8px 0 0', color: vars.colorRedError, fontSize: '14px' });

export const editPage = style({
  width: '100%',
  maxWidth: '638px',
  margin: '0 auto',
  padding: '24px 24px 64px',
  '@media': { '(max-width: 640px)': { padding: '16px 16px 64px' } },
});
export const editTitle = style({
  margin: '0 0 24px',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '28px',
});
export const editForm = style({ display: 'flex', flexDirection: 'column', gap: '24px' });
export const formSelectGroup = style({ display: 'flex', flexDirection: 'column', gap: '8px' });
export const formLabel = style({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  color: vars.colorGray700,
});
export const formSelect = style({
  width: '100%',
  height: '48px',
  padding: '0 16px',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '8px',
  fontFamily: vars.fontFamily,
  fontSize: '14px',
  color: vars.colorGray800,
  backgroundColor: '#fff',
  selectors: { '&:focus-visible': { outline: '2px solid ' + vars.colorBrand2 } },
});
export const formTextarea = style({
  display: 'block',
  width: '100%',
  height: '219px',
  padding: '16px',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '8px',
  resize: 'vertical',
  fontSize: '14px',
  lineHeight: 1.5,
  color: vars.colorGray800,
  selectors: { '&:focus-visible': { outline: '2px solid ' + vars.colorBrand2 } },
});
export const editSubmit = style({ width: '100%', height: '48px', borderRadius: '8px' });
export const editState = style({
  margin: '12px 0 20px',
  color: vars.colorGray600,
  fontSize: '15px',
});
export const editActions = style({ display: 'flex', alignItems: 'center', gap: '12px' });
