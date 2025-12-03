import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Costume {
  id: number;
  name: string;
  image: string;
  age: string;
  theme: string;
  gender: string;
  price: number;
  bookedDates: Date[];
}

const costumes: Costume[] = [
  {
    id: 1,
    name: 'Супергерой',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/a49ad539-95f5-4821-bc9e-4e60e43b4190.jpg',
    age: '5-7',
    theme: 'супергерои',
    gender: 'любой',
    price: 1500,
    bookedDates: [new Date(2025, 11, 15), new Date(2025, 11, 20)],
  },
  {
    id: 2,
    name: 'Принцесса',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/1f184ee0-bdea-4baf-8c3c-92992ddfd378.jpg',
    age: '3-5',
    theme: 'сказки',
    gender: 'девочка',
    price: 2000,
    bookedDates: [new Date(2025, 11, 25)],
  },
  {
    id: 3,
    name: 'Пират',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/8c7354c5-6a4c-49eb-bf98-3c985cfa1492.jpg',
    age: '5-7',
    theme: 'приключения',
    gender: 'мальчик',
    price: 1800,
    bookedDates: [new Date(2025, 11, 18)],
  },
  {
    id: 4,
    name: 'Волшебник',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/a49ad539-95f5-4821-bc9e-4e60e43b4190.jpg',
    age: '7-10',
    theme: 'сказки',
    gender: 'любой',
    price: 1700,
    bookedDates: [],
  },
  {
    id: 5,
    name: 'Бабочка',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/1f184ee0-bdea-4baf-8c3c-92992ddfd378.jpg',
    age: '3-5',
    theme: 'природа',
    gender: 'девочка',
    price: 1400,
    bookedDates: [new Date(2025, 11, 22)],
  },
  {
    id: 6,
    name: 'Космонавт',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/8c7354c5-6a4c-49eb-bf98-3c985cfa1492.jpg',
    age: '5-7',
    theme: 'космос',
    gender: 'любой',
    price: 1900,
    bookedDates: [],
  },
];

export default function Index() {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [cart, setCart] = useState<{ costume: Costume; date: Date | undefined }[]>([]);

  const filteredCostumes = costumes.filter((costume) => {
    if (selectedAge !== 'all' && costume.age !== selectedAge) return false;
    if (selectedTheme !== 'all' && costume.theme !== selectedTheme) return false;
    if (selectedGender !== 'all' && costume.gender !== selectedGender && costume.gender !== 'любой') return false;
    return true;
  });

  const addToCart = (costume: Costume, date: Date | undefined) => {
    setCart([...cart, { costume, date }]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const isDateBooked = (date: Date, costume: Costume) => {
    return costume.bookedDates.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-light tracking-wide text-gray-900">
                МаскаРад
              </h1>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle className="font-light">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">Пусто</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100">
                          <img
                            src={item.costume.image}
                            alt={item.costume.name}
                            className="w-16 h-16 object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-normal text-sm">{item.costume.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.date ? item.date.toLocaleDateString('ru-RU') : 'Дата не выбрана'}
                            </p>
                            <p className="text-sm mt-1">{item.costume.price} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(index)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm">Итого</span>
                          <span className="text-lg font-normal">
                            {cart.reduce((sum, item) => sum + item.costume.price, 0)} ₽
                          </span>
                        </div>
                        <Button className="w-full bg-black text-white hover:bg-gray-800">
                          Оформить
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-light mb-4 text-gray-900">
            Аренда детских костюмов
          </h2>
          <p className="text-gray-600">
            Костюмы для любого праздника с доставкой по улусу
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Возраст</label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="3-5">3-5 лет</SelectItem>
                  <SelectItem value="5-7">5-7 лет</SelectItem>
                  <SelectItem value="7-10">7-10 лет</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">Тематика</label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="супергерои">Супергерои</SelectItem>
                  <SelectItem value="сказки">Сказки</SelectItem>
                  <SelectItem value="приключения">Приключения</SelectItem>
                  <SelectItem value="природа">Природа</SelectItem>
                  <SelectItem value="космос">Космос</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">Пол</label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Любой" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой</SelectItem>
                  <SelectItem value="мальчик">Мальчик</SelectItem>
                  <SelectItem value="девочка">Девочка</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCostumes.map((costume) => (
            <Card key={costume.id} className="border-0 shadow-none group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-gray-50">
                <img
                  src={costume.image}
                  alt={costume.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-normal">{costume.name}</h3>
                  <Badge variant="outline" className="border-gray-300 text-gray-600 font-light">
                    {costume.age} лет
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-4">{costume.theme}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg">{costume.price} ₽</p>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Icon name="Calendar" size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-white">
                        <DialogHeader>
                          <DialogTitle className="font-light">{costume.name}</DialogTitle>
                        </DialogHeader>
                        <Calendar
                          mode="single"
                          className="rounded-md border-0"
                          modifiers={{
                            booked: costume.bookedDates,
                          }}
                          modifiersStyles={{
                            booked: {
                              backgroundColor: '#e5e5e5',
                              color: '#737373',
                              textDecoration: 'line-through',
                            },
                          }}
                          disabled={(date) => isDateBooked(date, costume)}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                          Выбрать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle className="font-light">Выберите дату</DialogTitle>
                        </DialogHeader>
                        <Calendar
                          mode="single"
                          onSelect={(date) => {
                            if (date && !isDateBooked(date, costume)) {
                              addToCart(costume, date);
                            }
                          }}
                          className="rounded-md border-0"
                          modifiers={{
                            booked: costume.bookedDates,
                          }}
                          modifiersStyles={{
                            booked: {
                              backgroundColor: '#e5e5e5',
                              color: '#737373',
                              textDecoration: 'line-through',
                            },
                          }}
                          disabled={(date) => isDateBooked(date, costume)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCostumes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">Костюмов не найдено</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedAge('all');
                setSelectedTheme('all');
                setSelectedGender('all');
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-200 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-normal mb-3">МаскаРад</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Аренда детских костюмов для праздников
              </p>
            </div>
            <div>
              <h4 className="font-normal mb-3">Контакты</h4>
              <div className="space-y-2 text-xs text-gray-500">
                <p>+7 (999) 123-45-67</p>
                <p>info@maskarad.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-normal mb-3">Доставка</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Борогонцы</li>
                <li>Маягасцы</li>
                <li>Чаран</li>
                <li>Мындаба</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
