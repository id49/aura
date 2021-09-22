import { useEffect } from 'react'
import { Button, Input, Label, HelperText, Select } from '@learn49/aura-ui'
import SelectDropdown from 'react-dropdown-select'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RecurringTypes } from '../index'
import InputMask from 'react-input-mask'
import Loading from '../../../../../../../components/Loading'

import Head from '../../../../../../../elements/Head'
import Title from '../../../../../../../elements/Title'

import { useMutation, useQuery } from '../../../../../../../lib/graphql'
import { isValid } from 'date-fns'

const Schema = Yup.object().shape({
  name: Yup.string().required('Preenchimento Obrigatório'),
  cameras: Yup.array().min(1, 'Selecione pelo menos 1 camera.'),
  startDate: Yup.string().test(
    'date-string',
    'Data de início inválida.',
    (value) => {
      return (
        value &&
        value.length === 10 &&
        isValid(new Date(value.split('/').reverse().join('-')))
      )
    }
  ),
  endDate: Yup.string()
    .nullable()
    .when('recurring', {
      is: (val) => val !== '0',
      then: Yup.string()
        .ensure()
        .test('date-string', 'Data de término inválida.', (value, { from }) => {
          if (value === '') {
            return true
          }

          return (
            value &&
            value.length === 10 &&
            value.match(/[0-9]{2,2}\/[0-9]{2,2}\/[0-9]{4,4}/) &&
            isValid(new Date(value.split('/').reverse().join('-')))
          )
        })
        .test(
          'date-gt-start',
          'Data de término precisa ser maior ou igual de início',
          (value, { from }) => {
            try {
              const start = from[0].value.startDate
              const start2 = start.split('/').reverse().join('-')
              const end = value.split('/').reverse().join('-')
              return (
                start.match(/[0-9]{2,2}\/[0-9]{2,2}\/[0-9]{4,4}/) &&
                isValid(new Date(start2)) &&
                start2 <= end
              )
            } catch (err) {}
            return false
          }
        )
    }),
  startHour: Yup.string().test(
    'hour-string',
    'Hora de início inválida',
    (value) => {
      const hourParts = value ? value.split(':') : ['-1', '-1']
      const hours = Number(hourParts[0])
      const minutes = Number(hourParts[1])
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
    }
  ),
  endHour: Yup.string()
    .test('hour-string', 'Hora de término inválida', (value) => {
      const hourParts = value ? value.split(':') : ['-1', '-1']
      const hours = Number(hourParts[0])
      const minutes = Number(hourParts[1])
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
    })
    .test(
      'hour-string',
      'Hora de término precisa ser maior que de início',
      (value, { from }) => {
        const startHour = from[0].value.startHour
        return value > startHour
      }
    )
})

const GET_SCHEDULE = (id) => `
  query{
    panelGetScheduleById(id: ${id}) {
      id
      name
      startDate
      endDate
      startHour
      endHour
      recurrency
      cameras{
        id
        name
      }
    }
  }
`

const GET_ALL_CAMERAS = `
  query{
    panelGetCameras {
      id
      name
      friendlyName
      url
    }
  }
`

const UPDATE_SCHEDULE = `
mutation panelUpdateSchedule(
  $id: Int!,
  $name: String!, 
  $startDate: String!, 
  $endDate: String!,
  $startHour: String!,
  $endHour: String!,
  $cameras: [Int!]!,
  $classroomId: Int!
  $recurrency: Int!
  ) {
  panelUpdateSchedule(input: {
      id: $id,
      name: $name,
      startHour: $startHour, 
      endHour: $endHour,
      startDate: $startDate,
      endDate: $endDate,
      cameras: $cameras,
      classroomId: $classroomId
      recurrency: $recurrency
  }) {
    id
  }
}`

const GET_CLASSROOM = (id) => `
  query{
    panelGetClassById(id: ${id}) {
      id
      name
      description
    }
  }
`

const Edit = () => {
  const router = useRouter()
  const { data: cameras } = useQuery(GET_ALL_CAMERAS, { autoRevalidate: false })
  const { data: schedule } = useQuery(GET_SCHEDULE(router.query.scheduleId), {
    autoRevalidate: false
  })
  const { data } = useQuery(GET_CLASSROOM(router.query.id))
  const [, updateSchedule] = useMutation(UPDATE_SCHEDULE)

  const cameraList =
    cameras && cameras.panelGetCameras
      ? cameras.panelGetCameras.map(({ id, name }) => ({ id, name }))
      : []

  const form = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      startHour: '08:00',
      endHour: '12:00',
      recurring: '0',
      cameras: []
    },
    validationSchema: Schema,
    onSubmit: async ({ startDate, endDate, recurring, ...values }) => {
      const data = {
        id: Number(router.query.scheduleId),
        ...values,
        recurrency: Number(recurring),
        startDate: startDate.split('/').reverse().join('-'),
        endDate:
          recurring === '0'
            ? startDate.split('/').reverse().join('-')
            : endDate.split('/').reverse().join('-'),
        classroomId: Number(router.query.id)
      }
      const updatedCreate = await updateSchedule(data)
      if (updatedCreate && updatedCreate?.panelUpdateSchedule) {
        router.push('/app/admin/classroom/' + router.query.id + '/schedule')
      } else {
        toast.error('Erro ao Salvar.')
      }
    }
  })

  const handleCamerasChange = (values) => {
    const ids = values.map(({ id }) => id)
    form.setFieldValue('cameras', ids)
  }

  // preparing values
  useEffect(() => {
    if (schedule) {
      const name = schedule?.panelGetScheduleById?.name
      const startDate = schedule?.panelGetScheduleById?.startDate
        .split('T')[0]
        ?.split('-')
        .reverse()
        .join('/')

      const endDate = schedule?.panelGetScheduleById?.endDate
        .split('T')[0]
        ?.split('-')
        .reverse()
        .join('/')

      const startHour = schedule?.panelGetScheduleById?.startHour.split(':')
      const endHour = schedule?.panelGetScheduleById?.endHour?.split(':')

      const cameras = schedule?.panelGetScheduleById?.cameras.map((c) => c.id)

      const recurring = String(schedule?.panelGetScheduleById?.recurrency)

      form.setFieldValue('name', name)
      form.setFieldValue('recurring', recurring)
      form.setFieldValue('startDate', startDate)
      form.setFieldValue('endDate', endDate)
      form.setFieldValue('startHour', `${startHour[0]}:${startHour[1]}`)
      form.setFieldValue(
        'endHour',
        `${endHour ? `${endHour[0]}:${endHour[1]}` : '00:00'}`
      )
      form.setFieldValue('cameras', cameras)
    }
  }, [schedule])

  return (
    <>
      <Head title='Editar agendamento' />
      <div className='mt-4'>
        <Title
          text='Editar agendamento'
          subText={`Turma: ${data?.panelGetClassById.name}`}
        />
      </div>
      <div className='mb-8 mt-6'>
        <form onSubmit={form.handleSubmit}>
          <div className='px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
            <Label>
              <span>Título:</span>
              <Input
                className='mt-1 rounded'
                id='name'
                defaultValue={schedule?.panelGetScheduleById.name}
                disabled={form.isSubmitting}
                valid={!form.errors.name}
                placeholder='Digite o Nome da Agenda'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.name && form.touched.name && (
                <HelperText className='text-red-300'>
                  {form.errors.name}
                </HelperText>
              )}
            </Label>
            <Label className='mt-3'>
              <span>Câmera:</span>
              <SelectDropdown
                multi
                options={cameraList}
                labelField='name'
                placeholder='Selecione a(s) Câmera(s)'
                valueField='id'
                closeOnSelect={false}
                searchable={true}
                searchBy='name'
                noDataLabel='Nenhuma câmera encontrada.'
                values={schedule?.panelGetScheduleById?.cameras}
                color='rgb(126,58,242)'
                keepSelectedInList={false}
                dropdownHandleRenderer={({ state }) => (
                  // if dropdown is open show "–" else show "+"
                  <span>{state.dropdown ? '–' : '+'}</span>
                )}
                onChange={handleCamerasChange}
              />
              {form.errors.cameras && (
                <HelperText className='text-red-300'>
                  {form.errors.cameras}
                </HelperText>
              )}
            </Label>
            <Label className='mt-3'>
              <span>Tipo de agendamento:</span>
              <Select
                className='mt-1'
                defaultValue={schedule?.panelGetScheduleById.recurring}
                onChange={form.handleChange}
                name='recurring'
              >
                {Object.keys(RecurringTypes).map((type) => {
                  return (
                    <option
                      value={type}
                      key={type}
                      selected={type === form.values.recurring}
                    >
                      {RecurringTypes[type]}
                    </option>
                  )
                })}
              </Select>
            </Label>
            <div className='flex mt-4 mb-2'>
              <div className='mr-2'>
                <Label>
                  <span>Data de Início:</span>
                </Label>
                <InputMask
                  className='w-32 text-sm text-center dark:text-gray-300 leading-5 px-5 py-2 bg-purple-300 dark:bg-purple-600'
                  mask={'99/99/9999'}
                  name='startDate'
                  value={form.values.startDate}
                  onChange={form.handleChange}
                />
                {form.errors.startDate && form.touched.startDate && (
                  <HelperText className='block text-red-300'>
                    {form.errors.startDate}
                  </HelperText>
                )}
              </div>

              {form.values.recurring !== '0' && (
                <div>
                  <Label>
                    <span>Data de Término:</span>
                  </Label>
                  <InputMask
                    className='w-32 text-sm text-center dark:text-gray-300 leading-5 px-5 py-2 bg-purple-300 dark:bg-purple-600'
                    mask={'99/99/9999'}
                    name='endDate'
                    value={form.values.endDate}
                    onChange={form.handleChange}
                  />
                  {form.errors.endDate && form.touched.endDate && (
                    <HelperText className='block text-red-300'>
                      {form.errors.endDate}
                    </HelperText>
                  )}
                </div>
              )}
            </div>
            <div className='flex mt-4 mb-2'>
              <div className='mr-2'>
                <Label className='mt-3'>
                  <span>Hora de início:</span>
                </Label>
                <InputMask
                  className='w-32 text-sm text-center dark:text-gray-300 leading-5 px-5 py-2 bg-purple-300 dark:bg-purple-600'
                  mask={'99:99'}
                  name='startHour'
                  value={form.values.startHour}
                  onChange={form.handleChange}
                />
                {form.errors.startHour && (
                  <HelperText className='block text-red-300'>
                    {form.errors.startHour}
                  </HelperText>
                )}
              </div>
              <div>
                <Label className='mt-3'>
                  <span>Hora de término:</span>
                </Label>
                <InputMask
                  className='w-32 text-sm text-center dark:text-gray-300 leading-5 px-5 py-2 bg-purple-300 dark:bg-purple-600'
                  mask={'99:99'}
                  name='endHour'
                  value={form.values.endHour}
                  onChange={form.handleChange}
                />
                {form.errors.endHour && (
                  <HelperText className='block text-red-300'>
                    {form.errors.endHour}
                  </HelperText>
                )}
              </div>
            </div>

            {form.isSubmitting && <Loading />}
            {!form.isSubmitting && (
              <div className='flex flex-col md:flex-row gap-4 mt-4'>
                <Button className='px-14' size='large' type={'submit'}>
                  Salvar
                </Button>
                <Link href={`/app/admin/classroom/${router.query.id}/schedule`}>
                  <Button className='px-10' size='large' layout='outline'>
                    Cancelar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Edit
