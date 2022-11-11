/*!
Copyright 2008 Fair Oaks Labs, Inc.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
exports.read=function(t,o,a,r,h){var M,p,f=8*h-r-1,w=(1<<f)-1,e=w>>1,i=-7,n=a?h-1:0,s=a?-1:1,N=t[o+n];for(n+=s,M=N&(1<<-i)-1,N>>=-i,i+=f;i>0;M=256*M+t[o+n],n+=s,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+t[o+n],n+=s,i-=8);if(0===M)M=1-e;else{if(M===w)return p?NaN:1/0*(N?-1:1);p+=Math.pow(2,r),M-=e}return(N?-1:1)*p*Math.pow(2,M-r)},exports.write=function(t,o,a,r,h,M){var p,f,w,e=8*M-h-1,i=(1<<e)-1,n=i>>1,s=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,N=r?0:M-1,u=r?1:-1,c=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(f=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(w=Math.pow(2,-p))<1&&(p--,w*=2),o+=p+n>=1?s/w:s*Math.pow(2,1-n),o*w>=2&&(p++,w/=2),p+n>=i?(f=0,p=i):p+n>=1?(f=(o*w-1)*Math.pow(2,h),p+=n):(f=o*Math.pow(2,n-1)*Math.pow(2,h),p=0));h>=8;t[a+N]=255&f,N+=u,f/=256,h-=8);for(p=p<<h|f,e+=h;e>0;t[a+N]=255&p,N+=u,p/=256,e-=8);t[a+N-u]|=128*c}