import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid, Baby, Shield, Moon, Video, Package, Droplets, Utensils, ScanFace, Plus, Share2, Download, TrendingDown, TrendingUp, Minus, Bell, Bookmark } from 'lucide-react';

const CATEGORIES = [
  { id: 'strollers', name: 'Strollers', count: 342, icon: Baby },
  { id: 'car-seats', name: 'Car Seats', count: 156, icon: Shield },
  { id: 'sleep', name: 'Sleep', count: 89, icon: Moon },
  { id: 'monitors', name: 'Monitors', count: 124, icon: Video },
];

const PRODUCTS = [
  { id: 'nuna', name: 'Nuna Pipa Lite RX', sku: 'CAR-2891', price: 319.95, msrp: 364.95, trend: -12, retailers: 4 },
  { id: 'halo', name: 'Halo BassiNest 3.0', sku: 'SLEEP-4432', price: 249.99, msrp: 249.99, trend: 0, retailers: 2 },
  { id: 'spectra', name: 'Spectra S1 Plus', sku: 'PUMP-8821', price: 199.99, msrp: 179.99, trend: 11, retailers: 3 },
  { id: 'ergo', name: 'Ergobaby Omni 360', sku: 'CARRY-1192', price: 179.99, msrp: 209.99, trend: -14, retailers: 5 },
];

const INSIGHTS = [
  { category: 'Strollers', trend: -8.4, positive: true },
  { category: 'Car Seats', trend: -4.2, positive: true },
  { category: 'Monitors', trend: 2.1, positive: false },
];

const ACTIVITY = [
  { type: 'drop', text: 'Price drop on Vista V2', time: '2m ago', source: 'Amazon' },
  { type: 'new', text: 'New retailer for Nuna', time: '15m ago', source: 'Babylist' },
  { type: 'up', text: 'Price up on Spectra S1', time: '1h ago', source: 'Target' },
  { type: 'restock', text: 'Restock: Halo Bassinet', time: '2h ago', source: 'BuyBuyBaby' },
];

const Home: React.FC = () => {
  return (
    <div className="home-page" style={{ paddingTop: '24px' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Stats */}
          <div className="space-y-3">
            <div className="glass rounded-xl p-3 inner-glow">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Tracked Items</div>
              <div className="text-2xl font-semibold mono-num">0</div>
            </div>
            <div className="glass rounded-xl p-3 inner-glow">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Active Alerts</div>
              <div className="text-2xl font-semibold mono-num text-emerald-400">0</div>
            </div>
            <div className="glass rounded-xl p-3 inner-glow">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Est. Savings</div>
              <div className="text-2xl font-semibold mono-num text-indigo-400">$0</div>
            </div>
          </div>

          {/* Categories */}
          <div className="glass rounded-2xl p-2 inner-glow space-y-1">
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-sm font-medium text-white border border-white/10">
              <div className="flex items-center space-x-3">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                <span>All Categories</span>
              </div>
              <span className="text-xs font-mono text-slate-400">2,847</span>
            </button>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-slate-400 hover:text-slate-200 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-600">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="glass rounded-2xl p-5 inner-glow space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Timeline</span>
              <span className="text-[10px] font-mono text-indigo-400">Week 20</span>
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-700"></div>
              <div className="space-y-4">
                <Link to="/pregnancy/week-20" className="relative pl-8 cursor-pointer group block">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-indigo-500 border-4 border-slate-800 shadow-glow"></div>
                  <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">Second Trimester</div>
                  <div className="text-xs text-slate-500">Weeks 14-27 • <span className="text-emerald-400">Active</span></div>
                </Link>
                <Link to="/pregnancy/week-28" className="relative pl-8 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity block">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-700 border-4 border-slate-800"></div>
                  <div className="text-sm font-medium text-slate-300">Third Trimester</div>
                  <div className="text-xs text-slate-500">Weeks 28-40</div>
                </Link>
                <Link to="/pregnancy/week-32" className="relative pl-8 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity block">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-700 border-4 border-slate-800"></div>
                  <div className="text-sm font-medium text-slate-300">Postpartum</div>
                  <div className="text-xs text-slate-500">0-12 weeks</div>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          
          {/* Featured Deal */}
          <div className="glass rounded-3xl p-6 inner-glow relative overflow-hidden group hover-lift cursor-pointer">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-colors"></div>
            
            <div className="relative z-10 flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">PRICE DROP</span>
                  <span className="text-[10px] font-mono text-slate-500">Updated 2m ago</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-1">UppaBaby Vista V2</h2>
                <p className="text-sm text-slate-400">Premium stroller system • Jake Black</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Bookmark className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="relative z-10 flex items-end justify-between">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold mono-num text-white">$929.99</span>
                <span className="text-lg text-slate-500 line-through mono-num">$1,049.99</span>
                <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">-$120.00</span>
              </div>
              <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium transition-all shadow-glow">
                View Deal
              </button>
            </div>

            <div className="relative z-10 mt-6 flex items-center space-x-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Available at</span>
              <div className="flex space-x-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">Amazon</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">Target</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">+3 more</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 border-b border-white/10">
            <button className="px-4 py-2 text-sm font-medium text-white border-b-2 border-indigo-500">Trending</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">Price Drops</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">New Arrivals</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">Watchlist</button>
          </div>

          {/* Product List */}
          <div className="space-y-3">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="glass rounded-2xl p-4 inner-glow hover-lift cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-slate-600">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-200 truncate">{product.name}</h3>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-500 border border-slate-700">{product.sku}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        {product.trend < 0 && <TrendingDown className="w-3 h-3 text-emerald-400" />}
                        {product.trend > 0 && <TrendingUp className="w-3 h-3 text-rose-400" />}
                        {product.trend === 0 && <Minus className="w-3 h-3 text-slate-500" />}
                        <span className={product.trend < 0 ? 'text-emerald-400 font-mono' : product.trend > 0 ? 'text-rose-400 font-mono' : 'font-mono'}>
                          {product.trend === 0 ? '0%' : `${product.trend > 0 ? '+' : ''}${product.trend}%`}
                        </span>
                      </span>
                      <span>•</span>
                      <span>{product.retailers} retailers</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold mono-num text-white">${product.price}</div>
                    {product.price !== product.msrp && (
                      <div className="text-xs text-slate-500 line-through mono-num">${product.msrp}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-sm text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors">
            Load 24 more products
          </button>

        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Activity Feed */}
          <div className="glass rounded-2xl p-5 inner-glow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Live Activity</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-soft"></span>
            </div>
            <div className="space-y-4">
              {ACTIVITY.map((item, idx) => (
                <div key={idx} className="flex space-x-3 text-sm">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                    item.type === 'drop' ? 'bg-emerald-500' : 
                    item.type === 'new' ? 'bg-blue-500' : 
                    item.type === 'up' ? 'bg-yellow-500' : 'bg-emerald-500'
                  }`}></div>
                  <div>
                    <div className="text-slate-300">{item.text.split(' on ')[0]} on <span className="text-white font-medium">{item.text.split(' on ')[1]}</span></div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">{item.time} • {item.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Insights */}
          <div className="glass rounded-2xl p-5 inner-glow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Market Insight</span>
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="space-y-4">
              {INSIGHTS.map((insight) => (
                <div key={insight.category}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-400">{insight.category}</span>
                    <span className={`font-mono ${insight.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {insight.positive ? '' : '+'}{insight.trend}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${insight.positive ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                      style={{ width: `${Math.abs(insight.trend) * 8 + 30}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-2 inner-glow space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                <Plus className="w-4 h-4 text-indigo-400" />
              </div>
              <span>Add to Registry</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Share2 className="w-4 h-4 text-purple-400" />
              </div>
              <span>Share List</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                <Download className="w-4 h-4 text-emerald-400" />
              </div>
              <span>Export CSV</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;